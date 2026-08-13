import { getDatabaseStatus } from '../config/db.js';

export const healthController = {
  getHealth(_req, res) {
    res.json({
      status: 'ok',
      phase: 1,
      modes: {
        live: 'planned',
        private: 'planned',
        solo: 'planned',
      },
      database: getDatabaseStatus(),
      socket: { enabled: false },
      ai: { enabled: false },
    });
  },
};
