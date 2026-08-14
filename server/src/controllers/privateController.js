import { env } from '../config/env.js';
import {
  CONVERSATION_TYPES,
  createPrivateSession,
  getPublicSessionInfo,
} from '../services/privateSessionService.js';

export const privateController = {
  getStatus(_req, res) {
    res.json({
      mode: 'private',
      ready: true,
      phase: 4,
      message: 'Private Mirror mode is available.',
    });
  },

  getConversationTypes(_req, res) {
    res.json({ types: CONVERSATION_TYPES });
  },

  createSession(req, res, next) {
    try {
      const { hostName, conversationType } = req.body;
      const session = createPrivateSession({ hostName, conversationType });
      const inviteLink = `${env.clientOrigin}/private/join/${session.code}`;

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
        message: 'This private room code was not found or has expired.',
      });
    }

    if (session.status === 'complete') {
      return res.status(410).json({
        error: 'Ended',
        message: 'This private conversation has ended.',
        ...session,
      });
    }

    res.json(session);
  },
};
