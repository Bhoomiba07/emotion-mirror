import { getDatabaseStatus } from '../config/db.js';

export const healthController = {
  getHealth(_req, res) {
    res.json({
      status: 'ok',
      phase: 3,
      modes: {
        live: 'available',
        private: 'planned',
        solo: 'planned',
      },
      database: getDatabaseStatus(),
      socket: { enabled: true, live: true },
      ai: { enabled: false },
    });
  },
};
