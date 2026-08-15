import { createSoloSession, getSoloSession, handleUpload } from '../services/soloSessionService.js';

export const soloController = {
  getStatus(_req, res) {
    res.json({
      mode: 'solo',
      ready: true,
      phase: 6,
      message: 'Solo Reflection mode is available with AI analysis.',
    });
  },

  async analyzePaste(req, res, next) {
    try {
      const { text } = req.body;
      const session = await createSoloSession({
        inputMethod: 'paste',
        inputText: text,
      });

      res.status(201).json({
        sessionId: session.sessionId,
        analysisResults: session.analysisResults,
      });
    } catch (error) {
      next(error);
    }
  },

  async analyzeDescribe(req, res, next) {
    try {
      const { description } = req.body;
      const session = await createSoloSession({
        inputMethod: 'describe',
        inputText: description,
      });

      res.status(201).json({
        sessionId: session.sessionId,
        analysisResults: session.analysisResults,
      });
    } catch (error) {
      next(error);
    }
  },

  analyzeUpload(_req, _res, next) {
    try {
      handleUpload();
    } catch (error) {
      next(error);
    }
  },

  getResults(req, res) {
    const session = getSoloSession(req.params.sessionId);

    if (!session) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'This Solo Reflection session was not found.',
      });
    }

    res.json({
      sessionId: session.sessionId,
      inputMethod: session.inputMethod,
      analysisResults: session.analysisResults,
    });
  },
};
