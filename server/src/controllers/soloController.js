import { createSoloSession, getSoloSession, handleUpload } from '../services/soloSessionService.js';

export const soloController = {
  getStatus(_req, res) {
    res.json({
      mode: 'solo',
      ready: true,
      phase: 5,
      message: 'Solo Reflection mode is available.',
    });
  },

  analyzePaste(req, res, next) {
    try {
      const { text } = req.body;
      const session = createSoloSession({
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

  analyzeDescribe(req, res, next) {
    try {
      const { description } = req.body;
      const session = createSoloSession({
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
