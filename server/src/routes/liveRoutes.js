import { Router } from 'express';
import { liveController } from '../controllers/liveController.js';

export const liveRouter = Router();

liveRouter.get('/status', liveController.getStatus);
liveRouter.get('/conversation-types', liveController.getConversationTypes);
liveRouter.post('/sessions', liveController.createSession);
liveRouter.get('/sessions/:code', liveController.getSession);
