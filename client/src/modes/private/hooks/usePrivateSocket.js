import { useEffect, useRef, useState } from 'react';
import {
  PRIVATE_EVENTS,
  createPrivateSocket,
} from '../../../services/privateSocket.js';

/**
 * Hook for Private Mirror Socket.IO connection.
 * Private mirror data arrives only via PRIVATE_MIRROR — never in room state.
 */
export function usePrivateSocket({ code, participantId, name, role, enabled }) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [roomState, setRoomState] = useState(null);
  const [messages, setMessages] = useState([]);
  const [privateMirror, setPrivateMirror] = useState(null);
  const [sharedReflections, setSharedReflections] = useState([]);
  const [error, setError] = useState(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (!enabled || !code || !participantId || !name || !role) return undefined;

    const socket = createPrivateSocket();
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      socket.emit(
        PRIVATE_EVENTS.JOIN,
        { code, participantId, name, role },
        (response) => {
          if (!response?.ok) {
            setError(response?.message || 'Unable to join private room.');
            return;
          }
          if (response.roomState) {
            setRoomState(response.roomState);
            setMessages(response.roomState.messages ?? []);
            setSharedReflections(response.roomState.sharedReflections ?? []);
            if (response.roomState.status === 'ended') {
              setEnded(true);
            }
          }
        },
      );
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on(PRIVATE_EVENTS.JOINED, (state) => {
      setRoomState(state);
      setMessages(state.messages ?? []);
      setSharedReflections(state.sharedReflections ?? []);
    });

    socket.on(PRIVATE_EVENTS.PRIVATE_MIRROR, (mirror) => {
      setPrivateMirror(mirror);
    });

    socket.on(PRIVATE_EVENTS.PARTICIPANT_JOINED, (state) => {
      setRoomState(state);
    });

    socket.on(PRIVATE_EVENTS.PARTICIPANT_LEFT, (state) => {
      setRoomState(state);
    });

    socket.on(PRIVATE_EVENTS.ROOM_STATE, (state) => {
      setRoomState(state);
      setMessages(state.messages ?? []);
      setSharedReflections(state.sharedReflections ?? []);
    });

    socket.on(PRIVATE_EVENTS.MESSAGE_RECEIVED, (message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    socket.on(PRIVATE_EVENTS.ENDED, (state) => {
      setRoomState(state);
      setEnded(true);
    });

    socket.on(PRIVATE_EVENTS.SHARE_UPDATED, (publicShare) => {
      setSharedReflections((prev) => {
        const next = prev.filter((item) => item.participantId !== publicShare.participantId);
        return [...next, publicShare];
      });
    });

    socket.on(PRIVATE_EVENTS.ERROR, (payload) => {
      setError(payload?.message || 'A connection error occurred.');
    });

    socket.connect();

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [code, participantId, name, role, enabled]);

  function sendMessage(text) {
    return new Promise((resolve, reject) => {
      const socket = socketRef.current;
      if (!socket?.connected) {
        reject(new Error('Not connected.'));
        return;
      }

      socket.emit(PRIVATE_EVENTS.MESSAGE_SEND, { text }, (response) => {
        if (response?.ok) resolve(response.message);
        else reject(new Error(response?.message || 'Failed to send message.'));
      });
    });
  }

  function endConversation() {
    return new Promise((resolve, reject) => {
      const socket = socketRef.current;
      if (!socket?.connected) {
        reject(new Error('Not connected.'));
        return;
      }

      socket.emit(PRIVATE_EVENTS.END, {}, (response) => {
        if (response?.ok) {
          setEnded(true);
          resolve(response.roomState);
        } else {
          reject(new Error(response?.message || 'Failed to end conversation.'));
        }
      });
    });
  }

  function shareReflection(selection) {
    return new Promise((resolve, reject) => {
      const socket = socketRef.current;
      if (!socket?.connected) {
        reject(new Error('Not connected.'));
        return;
      }

      socket.emit(PRIVATE_EVENTS.SHARE_REFLECTION, { selection }, (response) => {
        if (response?.ok) resolve(response);
        else reject(new Error(response?.message || 'Failed to share reflection.'));
      });
    });
  }

  return {
    connected,
    roomState,
    messages,
    privateMirror,
    sharedReflections,
    error,
    ended,
    sendMessage,
    endConversation,
    shareReflection,
  };
}
