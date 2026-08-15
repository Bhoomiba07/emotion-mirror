/**
 * In-memory Private Mirror session store (Phase 4 + Phase 6 AI integration).
 * Shared state and private mirror data are kept separate.
 * Now uses real Gemini AI with demo fallback.
 * No MongoDB — future phases will use MongoDB Atlas.
 */

import { analyzePrivateMirror } from '../ai/index.js';
import { isGeminiAvailable } from '../ai/geminiProvider.js';

const sessions = new Map();

const CONVERSATION_TYPES = ['Relationship', 'Friendship', 'Family', 'Workplace', 'Other'];

const DEMO_NEUTRAL_REFLECTION = [
  'The conversation began relatively calmly but became more emotionally intense during the middle section.',
  'Both participants showed signs of frustration, while vulnerability appeared later in the conversation.',
  'The conversation appeared to cool toward the end.',
];

const DEMO_CONVERSATION_SUMMARY =
  'A difficult conversation where both participants expressed strong feelings and later showed signs of cooling down.';

function generateCode() {
  let code;
  do {
    const digits = Math.floor(1000 + Math.random() * 9000);
    code = `EM-${digits}`;
  } while (sessions.has(code));
  return code;
}

/** Demo mirror of the OTHER participant (fallback) */
function getDemoPrivateMirrorFallback(session, participantId) {
  const participant = session.participants.find((p) => p.id === participantId);
  if (!participant) return null;

  if (participant.role === 'host') {
    return {
      demo: true,
      title: 'What might they be feeling?',
      signals: [
        { emoji: '😔', label: 'Hurt', confidence: 78 },
        { emoji: '🛡', label: 'Defensive', confidence: 56 },
      ],
      interpretation: "They may feel that their perspective isn't being heard.",
    };
  }

  return {
    demo: true,
    title: 'What might they be feeling?',
    signals: [
      { emoji: '😟', label: 'Anxious', confidence: 63 },
      { emoji: '😤', label: 'Frustrated', confidence: 51 },
    ],
    interpretation: 'They may feel pressured by the conversation.',
  };
}

/** Generate private mirror using AI or demo fallback */
export async function getDemoPrivateMirror(session, participantId) {
  const participant = session.participants.find((p) => p.id === participantId);
  if (!participant) return null;

  // If no messages yet, return demo
  if (!session.messages || session.messages.length === 0) {
    return getDemoPrivateMirrorFallback(session, participantId);
  }

  // Try AI analysis first
  if (isGeminiAvailable()) {
    try {
      const aiMirror = await analyzePrivateMirror({
        messages: session.messages,
        targetParticipantRole: participant.role,
      });
      return aiMirror;
    } catch (error) {
      console.error('Private mirror AI analysis failed:', error.message);
      console.log('→ Falling back to demo data');
      return getDemoPrivateMirrorFallback(session, participantId);
    }
  }

  // Fallback to demo
  return getDemoPrivateMirrorFallback(session, participantId);
}

export function createPrivateSession({ hostName, conversationType }) {
  const trimmedName = hostName?.trim();
  const type = conversationType?.trim();

  if (!trimmedName) {
    throw Object.assign(new Error('Host name is required.'), { status: 400 });
  }

  if (!CONVERSATION_TYPES.includes(type)) {
    throw Object.assign(new Error('Invalid conversation type.'), { status: 400 });
  }

  const code = generateCode();
  const session = {
    code,
    hostName: trimmedName,
    conversationType: type,
    title: 'Private Conversation',
    status: 'waiting',
    createdAt: new Date().toISOString(),
    endedAt: null,
    participants: [],
    messages: [],
    sharedReflections: [],
  };

  sessions.set(code, session);
  return session;
}

export function getPrivateSession(code) {
  return sessions.get(code?.toUpperCase()) ?? null;
}

export function addParticipant(code, participant) {
  const session = getPrivateSession(code);
  if (!session) return null;
  if (session.status === 'complete') return null;

  const existing = session.participants.find((p) => p.id === participant.id);
  if (existing) {
    existing.socketId = participant.socketId;
    existing.name = participant.name;
    existing.connected = true;
    return session;
  }

  if (session.status === 'ended') {
    return null;
  }

  if (session.participants.length >= 2) {
    throw Object.assign(new Error('This private room already has two participants.'), {
      status: 409,
    });
  }

  session.participants.push({
    id: participant.id,
    name: participant.name,
    role: participant.role,
    socketId: participant.socketId,
    connected: true,
    joinedAt: new Date().toISOString(),
    shareSelection: null,
  });

  if (session.participants.length === 2) {
    session.status = 'active';
  }

  return session;
}

export function removeParticipant(code, participantId) {
  const session = getPrivateSession(code);
  if (!session) return null;

  const participant = session.participants.find((p) => p.id === participantId);
  if (participant) {
    participant.connected = false;
    participant.socketId = null;
  }

  return session;
}

export function addMessage(code, message) {
  const session = getPrivateSession(code);
  if (!session || session.status === 'ended' || session.status === 'complete') return null;

  const entry = {
    id: crypto.randomUUID(),
    senderId: message.senderId,
    senderName: message.senderName,
    text: message.text.trim(),
    timestamp: new Date().toISOString(),
  };

  session.messages.push(entry);
  return entry;
}

export function endPrivateSession(code) {
  const session = getPrivateSession(code);
  if (!session) return null;

  session.status = 'ended';
  session.endedAt = new Date().toISOString();
  return session;
}

export function getPublicSessionInfo(code) {
  const session = getPrivateSession(code);
  if (!session) return null;

  return {
    code: session.code,
    hostName: session.hostName,
    title: session.title,
    conversationType: session.conversationType,
    status: session.status,
    participantCount: session.participants.length,
    canJoin: session.status === 'waiting' && session.participants.length < 2,
  };
}

/** Shared room state only — never includes private mirror data. */
export function getSharedRoomState(code) {
  const session = getPrivateSession(code);
  if (!session) return null;

  return {
    code: session.code,
    hostName: session.hostName,
    title: session.title,
    conversationType: session.conversationType,
    status: session.status,
    participants: session.participants.map(({ id, name, role, connected, shareSelection }) => ({
      id,
      name,
      role,
      connected,
      hasShared: Boolean(shareSelection),
    })),
    messages: session.messages,
    sharedReflections: session.sharedReflections,
    neutralReflection: session.status === 'ended' || session.status === 'complete'
      ? { demo: true, paragraphs: DEMO_NEUTRAL_REFLECTION }
      : null,
  };
}

export async function setShareReflection(code, participantId, selection) {
  const session = getPrivateSession(code);
  if (!session) return null;

  const participant = session.participants.find((p) => p.id === participantId);
  if (!participant) return null;

  const normalized = {
    emotionalSignals: Boolean(selection?.emotionalSignals),
    privateInterpretation: Boolean(selection?.privateInterpretation),
    conversationSummary: Boolean(selection?.conversationSummary),
  };

  participant.shareSelection = normalized;

  const mirror = await getDemoPrivateMirror(session, participantId);
  const publicShare = {
    participantId: participant.id,
    participantName: participant.name,
    demo: mirror?.demo || false,
    shared: {},
  };

  if (normalized.emotionalSignals && mirror) {
    publicShare.shared.emotionalSignals = mirror.signals;
  }
  if (normalized.privateInterpretation && mirror) {
    publicShare.shared.privateInterpretation = mirror.interpretation;
  }
  if (normalized.conversationSummary) {
    publicShare.shared.conversationSummary = mirror?.conversationSummary || DEMO_CONVERSATION_SUMMARY;
  }

  const existingIndex = session.sharedReflections.findIndex(
    (item) => item.participantId === participantId,
  );
  if (existingIndex >= 0) {
    session.sharedReflections[existingIndex] = publicShare;
  } else {
    session.sharedReflections.push(publicShare);
  }

  return publicShare;
}

export { CONVERSATION_TYPES, DEMO_NEUTRAL_REFLECTION };
