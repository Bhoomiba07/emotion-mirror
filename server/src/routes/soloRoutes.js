import { Router } from 'express';
import { soloController } from '../controllers/soloController.js';

export const soloRouter = Router();

soloRouter.get('/status', soloController.getStatus);
soloRouter.post('/analyze-paste', soloController.analyzePaste);
soloRouter.post('/analyze-describe', soloController.analyzeDescribe);
soloRouter.post('/analyze-upload', soloController.analyzeUpload);
soloRouter.get('/results/:sessionId', soloController.getResults);
