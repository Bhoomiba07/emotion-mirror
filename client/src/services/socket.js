/**
 * Socket.IO client stub — prepared for Live and Private modes.
 * Do not connect until a later phase enables real-time features.
 */
export function createSocketPlaceholder() {
  return {
    connected: false,
    connect() {
      throw new Error('Socket.IO is not enabled in Phase 1.');
    },
    disconnect() {},
  };
}
