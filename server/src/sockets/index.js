import { Server } from 'socket.io';
import { env } from '../config/env.js';
import { registerLiveHandlers } from './live/index.js';
import { registerPrivateHandlers } from './private/index.js';

/**
 * Attach a shared Socket.IO server for Live and Private modes.
 */
export function attachSockets(server) {
  const io = new Server(server, {
    cors: {
      origin: env.clientOrigin,
      methods: ['GET', 'POST'],
    },
    path: '/socket.io',
  });

  registerLiveHandlers(io);
  registerPrivateHandlers(io);

  return {
    enabled: true,
    live: true,
    private: true,
    io,
  };
}
