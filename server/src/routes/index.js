import { Router } from 'express';
import { healthController } from '../controllers/healthController.js';
import { liveRouter } from './liveRoutes.js';
import { privateRouter } from './privateRoutes.js';
import { soloRouter } from './soloRoutes.js';

export const apiRouter = Router();

apiRouter.get('/health', healthController.getHealth);
apiRouter.use('/live', liveRouter);
apiRouter.use('/private', privateRouter);
apiRouter.use('/solo', soloRouter);
