/**
 * Domain services for room/session creation.
 * Live sessions are handled by liveSessionService (Phase 3).
 */
export { createLiveSession, getLiveSession } from './liveSessionService.js';

export const sessionService = {
  async createPrivateSession() {
    throw new Error('Private sessions are not implemented yet.');
  },
};
