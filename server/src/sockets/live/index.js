import { Server } from 'socket.io';
import { env } from '../../config/env.js';
import {
  addMessage,
  addParticipant,
  endLiveSession,
  getLiveSession,
  getRoomState,
  removeParticipant,
} from '../../services/liveSessionService.js';
import { LIVE_EVENTS } from './events.js';

/**
 * Register Live Conversation Socket.IO handlers on a shared io instance.
 */
export function registerLiveHandlers(io) {
  io.on('connection', (socket) => {
    let currentCode = null;
    let currentParticipantId = null;

    socket.on(LIVE_EVENTS.JOIN, (payload, callback) => {
      try {
        const { code, participantId, name, role } = payload ?? {};
        const session = getLiveSession(code);

        if (!session) {
          const error = { message: 'Conversation not found.' };
          socket.emit(LIVE_EVENTS.ERROR, error);
          callback?.({ ok: false, ...error });
          return;
        }

        if (session.status === 'ended') {
          const error = { message: 'This conversation has ended.' };
          socket.emit(LIVE_EVENTS.ERROR, error);
          callback?.({ ok: false, ...error });
          return;
        }

        const trimmedName = name?.trim();
        if (!trimmedName || !participantId || !role) {
          const error = { message: 'Name, participant id, and role are required.' };
          socket.emit(LIVE_EVENTS.ERROR, error);
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

        const roomState = getRoomState(currentCode);
        socket.emit(LIVE_EVENTS.JOINED, roomState);
        socket.to(currentCode).emit(LIVE_EVENTS.PARTICIPANT_JOINED, roomState);
        io.to(currentCode).emit(LIVE_EVENTS.ROOM_STATE, roomState);

        callback?.({ ok: true, roomState });
      } catch (error) {
        const message = error.message || 'Unable to join conversation.';
        socket.emit(LIVE_EVENTS.ERROR, { message });
        callback?.({ ok: false, message });
      }
    });

    socket.on(LIVE_EVENTS.MESSAGE_SEND, (payload, callback) => {
      if (!currentCode || !currentParticipantId) {
        callback?.({ ok: false, message: 'Not connected to a room.' });
        return;
      }

      const session = getLiveSession(currentCode);
      if (!session || session.status === 'ended') {
        callback?.({ ok: false, message: 'Conversation is not active.' });
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

      io.to(currentCode).emit(LIVE_EVENTS.MESSAGE_RECEIVED, message);
      callback?.({ ok: true, message });
    });

    socket.on(LIVE_EVENTS.END, (_payload, callback) => {
      if (!currentCode) {
        callback?.({ ok: false, message: 'Not connected to a room.' });
        return;
      }

      const session = endLiveSession(currentCode);
      if (!session) {
        callback?.({ ok: false, message: 'Conversation not found.' });
        return;
      }

      const roomState = getRoomState(currentCode);
      io.to(currentCode).emit(LIVE_EVENTS.ENDED, roomState);
      callback?.({ ok: true, roomState });
    });

    socket.on('disconnect', () => {
      if (!currentCode || !currentParticipantId) return;

      removeParticipant(currentCode, currentParticipantId);
      const roomState = getRoomState(currentCode);
      if (roomState) {
        io.to(currentCode).emit(LIVE_EVENTS.PARTICIPANT_LEFT, roomState);
        io.to(currentCode).emit(LIVE_EVENTS.ROOM_STATE, roomState);
      }
    });
  });
}

export function attachLiveSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: env.clientOrigin,
      methods: ['GET', 'POST'],
    },
    path: '/socket.io',
  });

  registerLiveHandlers(io);
  return io;
}
