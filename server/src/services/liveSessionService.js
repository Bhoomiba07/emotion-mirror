/**
 * In-memory Live Conversation session store (Phase 3).
 * No MongoDB persistence — future phases will use MongoDB Atlas.
 */

const sessions = new Map();

const CONVERSATION_TYPES = ['Relationship', 'Friendship', 'Family', 'Workplace', 'Other'];

function generateCode() {
  let code;
  do {
    const digits = Math.floor(1000 + Math.random() * 9000);
    code = `EM-${digits}`;
  } while (sessions.has(code));
  return code;
}

export function createLiveSession({ hostName, conversationType }) {
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
    title: 'Important Conversation',
    status: 'waiting',
    createdAt: new Date().toISOString(),
    endedAt: null,
    participants: [],
    messages: [],
  };

  sessions.set(code, session);
  return session;
}

export function getLiveSession(code) {
  return sessions.get(code?.toUpperCase()) ?? null;
}

export function addParticipant(code, participant) {
  const session = getLiveSession(code);
  if (!session) return null;
  if (session.status === 'ended') return null;

  const existing = session.participants.find((p) => p.id === participant.id);
  if (existing) {
    existing.socketId = participant.socketId;
    existing.name = participant.name;
    existing.connected = true;
    return session;
  }

  if (session.participants.length >= 2) {
    throw Object.assign(new Error('This conversation already has two participants.'), {
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
  });

  if (session.participants.length === 2) {
    session.status = 'active';
  }

  return session;
}

export function removeParticipant(code, participantId) {
  const session = getLiveSession(code);
  if (!session) return null;

  const participant = session.participants.find((p) => p.id === participantId);
  if (participant) {
    participant.connected = false;
    participant.socketId = null;
  }

  return session;
}

export function addMessage(code, message) {
  const session = getLiveSession(code);
  if (!session || session.status === 'ended') return null;

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

export function endLiveSession(code) {
  const session = getLiveSession(code);
  if (!session) return null;

  session.status = 'ended';
  session.endedAt = new Date().toISOString();
  return session;
}

export function getPublicSessionInfo(code) {
  const session = getLiveSession(code);
  if (!session) return null;

  return {
    code: session.code,
    hostName: session.hostName,
    title: session.title,
    conversationType: session.conversationType,
    status: session.status,
    participantCount: session.participants.length,
    canJoin: session.status !== 'ended' && session.participants.length < 2,
  };
}

export function getRoomState(code) {
  const session = getLiveSession(code);
  if (!session) return null;

  return {
    code: session.code,
    hostName: session.hostName,
    title: session.title,
    conversationType: session.conversationType,
    status: session.status,
    participants: session.participants.map(({ id, name, role, connected }) => ({
      id,
      name,
      role,
      connected,
    })),
    messages: session.messages,
  };
}

export { CONVERSATION_TYPES };
