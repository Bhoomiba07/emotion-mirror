import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || '';

/**
 * Socket.IO client for Live Conversation mode (Phase 6 AI-enabled).
 * Used for room join, presence, messaging, and AI analysis.
 */
export function createLiveSocket() {
  return io(SOCKET_URL, {
    path: '/socket.io',
    autoConnect: false,
    transports: ['websocket', 'polling'],
  });
}

export const LIVE_EVENTS = {
  JOIN: 'live:join',
  JOINED: 'live:joined',
  PARTICIPANT_JOINED: 'live:participant-joined',
  PARTICIPANT_LEFT: 'live:participant-left',
  MESSAGE_SEND: 'live:message-send',
  MESSAGE_RECEIVED: 'live:message-received',
  ROOM_STATE: 'live:room-state',
  END: 'live:end',
  ENDED: 'live:ended',
  ERROR: 'live:error',
  LIVE_MIRROR: 'live:mirror', // Phase 6 AI mirror update
};

export function getOrCreateParticipantId(code) {
  const key = `emotion-mirror:participant:${code}`;
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function getStoredParticipantRole(code) {
  return sessionStorage.getItem(`emotion-mirror:role:${code}`);
}

export function storeParticipantRole(code, role) {
  sessionStorage.setItem(`emotion-mirror:role:${code}`, role);
}

export function getStoredParticipantName(code) {
  return sessionStorage.getItem(`emotion-mirror:name:${code}`);
}

export function storeParticipantName(code, name) {
  sessionStorage.setItem(`emotion-mirror:name:${code}`, name);
}

export function clearParticipantStorage(code) {
  sessionStorage.removeItem(`emotion-mirror:participant:${code}`);
  sessionStorage.removeItem(`emotion-mirror:role:${code}`);
  sessionStorage.removeItem(`emotion-mirror:name:${code}`);
}
