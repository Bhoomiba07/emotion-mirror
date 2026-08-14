import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || '';

export function createPrivateSocket() {
  return io(SOCKET_URL, {
    path: '/socket.io',
    autoConnect: false,
    transports: ['websocket', 'polling'],
  });
}

export const PRIVATE_EVENTS = {
  JOIN: 'private:join',
  JOINED: 'private:joined',
  PRIVATE_MIRROR: 'private:mirror',
  PARTICIPANT_JOINED: 'private:participant-joined',
  PARTICIPANT_LEFT: 'private:participant-left',
  MESSAGE_SEND: 'private:message-send',
  MESSAGE_RECEIVED: 'private:message-received',
  ROOM_STATE: 'private:room-state',
  END: 'private:end',
  ENDED: 'private:ended',
  SHARE_REFLECTION: 'private:share-reflection',
  SHARE_UPDATED: 'private:share-updated',
  ERROR: 'private:error',
};

const PREFIX = 'emotion-mirror:private';

export function getOrCreateParticipantId(code) {
  const key = `${PREFIX}:participant:${code}`;
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function getStoredParticipantRole(code) {
  return sessionStorage.getItem(`${PREFIX}:role:${code}`);
}

export function storeParticipantRole(code, role) {
  sessionStorage.setItem(`${PREFIX}:role:${code}`, role);
}

export function getStoredParticipantName(code) {
  return sessionStorage.getItem(`${PREFIX}:name:${code}`);
}

export function storeParticipantName(code, name) {
  sessionStorage.setItem(`${PREFIX}:name:${code}`, name);
}

export function clearParticipantStorage(code) {
  sessionStorage.removeItem(`${PREFIX}:participant:${code}`);
  sessionStorage.removeItem(`${PREFIX}:role:${code}`);
  sessionStorage.removeItem(`${PREFIX}:name:${code}`);
}
