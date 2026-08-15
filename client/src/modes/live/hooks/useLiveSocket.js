import { useEffect, useRef, useState } from 'react';
import {
  LIVE_EVENTS,
  createLiveSocket,
} from '../../../services/liveSocket.js';

/**
 * Hook for Live Conversation Socket.IO connection (Phase 6 AI-enabled).
 * Handles join, messages, room state, end, and AI mirror updates.
 */
export function useLiveSocket({ code, participantId, name, role, enabled }) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [roomState, setRoomState] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [ended, setEnded] = useState(false);
  const [liveMirror, setLiveMirror] = useState(null); // Phase 6: AI mirror data

  useEffect(() => {
    if (!enabled || !code || !participantId || !name || !role) return undefined;

    const socket = createLiveSocket();
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      socket.emit(
        LIVE_EVENTS.JOIN,
        { code, participantId, name, role },
        (response) => {
          if (!response?.ok) {
            setError(response?.message || 'Unable to join conversation.');
            return;
          }
          if (response.roomState) {
            setRoomState(response.roomState);
            setMessages(response.roomState.messages ?? []);
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

    socket.on(LIVE_EVENTS.JOINED, (state) => {
      setRoomState(state);
      setMessages(state.messages ?? []);
    });

    socket.on(LIVE_EVENTS.PARTICIPANT_JOINED, (state) => {
      setRoomState(state);
    });

    socket.on(LIVE_EVENTS.PARTICIPANT_LEFT, (state) => {
      setRoomState(state);
    });

    socket.on(LIVE_EVENTS.ROOM_STATE, (state) => {
      setRoomState(state);
      setMessages(state.messages ?? []);
    });

    socket.on(LIVE_EVENTS.MESSAGE_RECEIVED, (message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    socket.on(LIVE_EVENTS.ENDED, (state) => {
      setRoomState(state);
      setEnded(true);
    });

    socket.on(LIVE_EVENTS.ERROR, (payload) => {
      setError(payload?.message || 'A connection error occurred.');
    });

    // Phase 6: Listen for AI mirror updates
    socket.on(LIVE_EVENTS.LIVE_MIRROR, (mirror) => {
      setLiveMirror(mirror);
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

      socket.emit(LIVE_EVENTS.MESSAGE_SEND, { text }, (response) => {
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

      socket.emit(LIVE_EVENTS.END, {}, (response) => {
        if (response?.ok) {
          setEnded(true);
          resolve(response.roomState);
        } else {
          reject(new Error(response?.message || 'Failed to end conversation.'));
        }
      });
    });
  }

  return {
    connected,
    roomState,
    messages,
    error,
    ended,
    liveMirror, // Phase 6: Expose AI mirror data
    sendMessage,
    endConversation,
  };
}
