import { Router } from 'express';

export const privateRouter = Router();

privateRouter.get('/status', (_req, res) => {
  res.json({
    mode: 'private',
    ready: false,
    message: 'Private Mirror endpoints will be implemented in a later phase.',
  });
});
