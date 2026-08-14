import {
  addMessage,
  addParticipant,
  endPrivateSession,
  getDemoPrivateMirror,
  getPrivateSession,
  getSharedRoomState,
  removeParticipant,
  setShareReflection,
} from '../../services/privateSessionService.js';
import { PRIVATE_EVENTS } from './events.js';

function emitPrivateMirrorToSocket(socket, session, participantId) {
  const mirror = getDemoPrivateMirror(session, participantId);
  if (mirror) {
    socket.emit(PRIVATE_EVENTS.PRIVATE_MIRROR, mirror);
  }
}

/**
 * Register Private Mirror Socket.IO handlers on a shared io instance.
 * Private mirror data is emitted only to the intended participant's socket.
 */
export function registerPrivateHandlers(io) {
  io.on('connection', (socket) => {
    let currentCode = null;
    let currentParticipantId = null;

    socket.on(PRIVATE_EVENTS.JOIN, (payload, callback) => {
      try {
        const { code, participantId, name, role } = payload ?? {};
        const session = getPrivateSession(code);

        if (!session) {
          const error = { message: 'Private room not found.' };
          socket.emit(PRIVATE_EVENTS.ERROR, error);
          callback?.({ ok: false, ...error });
          return;
        }

        if (session.status === 'complete') {
          const error = { message: 'This private conversation is complete.' };
          socket.emit(PRIVATE_EVENTS.ERROR, error);
          callback?.({ ok: false, ...error });
          return;
        }

        const trimmedName = name?.trim();
        if (!trimmedName || !participantId || !role) {
          const error = { message: 'Name, participant id, and role are required.' };
          socket.emit(PRIVATE_EVENTS.ERROR, error);
          callback?.({ ok: false, ...error });
          return;
        }

        const beforeJoin = getPrivateSession(code);
        const isReconnect = beforeJoin?.participants.some((p) => p.id === participantId);

        if (beforeJoin?.status === 'ended' && !isReconnect) {
          const error = { message: 'This private conversation has ended.' };
          socket.emit(PRIVATE_EVENTS.ERROR, error);
          callback?.({ ok: false, ...error });
          return;
        }

        addParticipant(code, {
          id: participantId,
          name: trimmedName,
          role,
          socketId: socket.id,
        });

        currentCode = code.toUpperCase();
        currentParticipantId = participantId;
        socket.join(currentCode);

        const updatedSession = getPrivateSession(currentCode);
        const sharedState = getSharedRoomState(currentCode);

        if (updatedSession.status !== 'ended') {
          emitPrivateMirrorToSocket(socket, updatedSession, currentParticipantId);
        }

        socket.emit(PRIVATE_EVENTS.JOINED, sharedState);
        socket.to(currentCode).emit(PRIVATE_EVENTS.PARTICIPANT_JOINED, sharedState);
        io.to(currentCode).emit(PRIVATE_EVENTS.ROOM_STATE, sharedState);

        callback?.({ ok: true, roomState: sharedState });
      } catch (error) {
        const message = error.message || 'Unable to join private room.';
        socket.emit(PRIVATE_EVENTS.ERROR, { message });
        callback?.({ ok: false, message });
      }
    });

    socket.on(PRIVATE_EVENTS.MESSAGE_SEND, (payload, callback) => {
      if (!currentCode || !currentParticipantId) {
        callback?.({ ok: false, message: 'Not connected to a private room.' });
        return;
      }

      const session = getPrivateSession(currentCode);
      if (!session || session.status === 'ended' || session.status === 'complete') {
        callback?.({ ok: false, message: 'Private conversation is not active.' });
        return;
      }

      const text = payload?.text?.trim();
      if (!text) {
        callback?.({ ok: false, message: 'Message cannot be empty.' });
        return;
      }

      const participant = session.participants.find((p) => p.id === currentParticipantId);
      if (!participant) {
        callback?.({ ok: false, message: 'Participant not found.' });
        return;
      }

      const message = addMessage(currentCode, {
        senderId: currentParticipantId,
        senderName: participant.name,
        text,
      });

      io.to(currentCode).emit(PRIVATE_EVENTS.MESSAGE_RECEIVED, message);
      callback?.({ ok: true, message });
    });

    socket.on(PRIVATE_EVENTS.END, (_payload, callback) => {
      if (!currentCode) {
        callback?.({ ok: false, message: 'Not connected to a private room.' });
        return;
      }

      const session = endPrivateSession(currentCode);
      if (!session) {
        callback?.({ ok: false, message: 'Private room not found.' });
        return;
      }

      const sharedState = getSharedRoomState(currentCode);
      io.to(currentCode).emit(PRIVATE_EVENTS.ENDED, sharedState);
      callback?.({ ok: true, roomState: sharedState });
    });

    socket.on(PRIVATE_EVENTS.SHARE_REFLECTION, (payload, callback) => {
      if (!currentCode || !currentParticipantId) {
        callback?.({ ok: false, message: 'Not connected to a private room.' });
        return;
      }

      const session = getPrivateSession(currentCode);
      if (!session || session.status !== 'ended') {
        callback?.({ ok: false, message: 'Sharing is only available after the conversation ends.' });
        return;
      }

      const publicShare = setShareReflection(currentCode, currentParticipantId, payload?.selection);
      if (!publicShare) {
        callback?.({ ok: false, message: 'Unable to save share selection.' });
        return;
      }

      const sharedState = getSharedRoomState(currentCode);

      io.to(currentCode).emit(PRIVATE_EVENTS.SHARE_UPDATED, publicShare);
      io.to(currentCode).emit(PRIVATE_EVENTS.ROOM_STATE, sharedState);

      callback?.({ ok: true, publicShare, roomState: sharedState });
    });

    socket.on('disconnect', () => {
      if (!currentCode || !currentParticipantId) return;

      removeParticipant(currentCode, currentParticipantId);
      const sharedState = getSharedRoomState(currentCode);
      if (sharedState) {
        io.to(currentCode).emit(PRIVATE_EVENTS.PARTICIPANT_LEFT, sharedState);
        io.to(currentCode).emit(PRIVATE_EVENTS.ROOM_STATE, sharedState);
      }
    });
  });
}
