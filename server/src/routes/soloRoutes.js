import { Router } from 'express';

export const soloRouter = Router();

soloRouter.get('/status', (_req, res) => {
  res.json({
    mode: 'solo',
    ready: false,
    message: 'Solo Reflection REST endpoints will be implemented in a later phase.',
  });
});
