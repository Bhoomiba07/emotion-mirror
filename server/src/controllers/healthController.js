import { getDatabaseStatus } from '../config/db.js';

export const healthController = {
  getHealth(_req, res) {
    res.json({
      status: 'ok',
      phase: 4,
      modes: {
        live: 'available',
        private: 'available',
        solo: 'planned',
      },
      database: getDatabaseStatus(),
      socket: { enabled: true, live: true, private: true },
      ai: { enabled: false },
    });
  },
};
