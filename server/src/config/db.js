/**
 * MongoDB connection stub for a later phase.
 * Phase 1 intentionally does not connect to a database.
 */
export async function connectDatabase() {
  throw new Error('MongoDB integration is not implemented in Phase 1.');
}

export function getDatabaseStatus() {
  return {
    configured: Boolean(process.env.MONGODB_URI),
    connected: false,
    phase: 1,
  };
}
