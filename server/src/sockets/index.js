import { attachLiveSocket } from './live/index.js';

/**
 * Attach Socket.IO for Live Conversation mode.
 * Private mode sockets will be added in a later phase.
 */
export function attachSockets(server) {
  const io = attachLiveSocket(server);
  return {
    enabled: true,
    live: true,
    io,
  };
}
