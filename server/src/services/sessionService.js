/**
 * Domain services for rooms/sessions — implemented in later phases.
 */
export const sessionService = {
  async createLiveSession() {
    throw new Error('Live sessions are not implemented in Phase 1.');
  },
  async createPrivateSession() {
    throw new Error('Private sessions are not implemented in Phase 1.');
  },
};
