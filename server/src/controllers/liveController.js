import { env } from '../config/env.js';
import {
  CONVERSATION_TYPES,
  createLiveSession,
  getPublicSessionInfo,
} from '../services/liveSessionService.js';

export const liveController = {
  getStatus(_req, res) {
    res.json({
      mode: 'live',
      ready: true,
      phase: 3,
      message: 'Live Conversation mode is available.',
    });
  },

  getConversationTypes(_req, res) {
    res.json({ types: CONVERSATION_TYPES });
  },

  createSession(req, res, next) {
    try {
      const { hostName, conversationType } = req.body;
      const session = createLiveSession({ hostName, conversationType });
      const inviteLink = `${env.clientOrigin}/live/join/${session.code}`;

      res.status(201).json({
        code: session.code,
        hostName: session.hostName,
        conversationType: session.conversationType,
        title: session.title,
        status: session.status,
        inviteLink,
      });
    } catch (error) {
      next(error);
    }
  },

  getSession(req, res) {
    const session = getPublicSessionInfo(req.params.code);

    if (!session) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'This conversation code was not found or has expired.',
      });
    }

    if (session.status === 'ended') {
      return res.status(410).json({
        error: 'Ended',
        message: 'This conversation has ended.',
        ...session,
      });
    }

    res.json(session);
  },
};
