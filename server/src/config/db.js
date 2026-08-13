/**
 * MongoDB connection stub for a later phase.
 * Future phases must use MongoDB Atlas via MONGODB_URI env var (never local MongoDB).
 * No database connection is established in Phase 1/2.
 */
export async function connectDatabase() {
  throw new Error('MongoDB Atlas integration is not implemented yet.');
}

export function getDatabaseStatus() {
  return {
    configured: Boolean(process.env.MONGODB_URI),
    connected: false,
    phase: 1,
  };
}
