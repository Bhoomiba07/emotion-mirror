import { Router } from 'express';

export const liveRouter = Router();

liveRouter.get('/status', (_req, res) => {
  res.json({
    mode: 'live',
    ready: false,
    message: 'Live Conversation endpoints will be implemented in a later phase.',
  });
});
