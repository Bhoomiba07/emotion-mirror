/**
 * Socket.IO attachment stub for Live and Private modes.
 * Real socket.io package and handlers arrive in a later phase.
 */
export function attachSocketPlaceholder(server) {
  server.on('request', () => {});
  return {
    enabled: false,
    note: 'Socket.IO will be wired here for Live and Private modes.',
  };
}
