import { Router } from 'express';
import { privateController } from '../controllers/privateController.js';

export const privateRouter = Router();

privateRouter.get('/status', privateController.getStatus);
privateRouter.get('/conversation-types', privateController.getConversationTypes);
privateRouter.post('/sessions', privateController.createSession);
privateRouter.get('/sessions/:code', privateController.getSession);
