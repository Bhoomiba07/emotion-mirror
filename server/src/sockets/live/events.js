/**
 * Socket.IO event names for Live Conversation mode.
 */
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
};
