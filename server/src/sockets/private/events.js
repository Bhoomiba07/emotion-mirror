/**
 * Socket.IO event names for Private Mirror mode.
 * Private mirror data uses PRIVATE_MIRROR only — never ROOM_STATE.
 */
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
