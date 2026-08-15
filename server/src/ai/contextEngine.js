/**
 * Context engine (Phase 6).
 * Extracts and structures conversation context for analysis.
 */

/**
 * Extract conversation context from messages.
 * Prepares data for AI analysis.
 */
export function extractContext(messages) {
  if (!messages || messages.length === 0) {
    return {
      messageCount: 0,
      participantCount: 0,
      conversationText: '',
      speakers: [],
    };
  }

  const speakers = [...new Set(messages.map(m => m.senderName || m.senderId))];
  const conversationText = messages
    .map(m => `${m.senderName || 'Unknown'}: ${m.text}`)
    .join('\n');

  return {
    messageCount: messages.length,
    participantCount: speakers.length,
    conversationText,
    speakers,
  };
}

/**
 * Identify speakers in conversation.
 * Returns array of unique speaker identifiers.
 */
export function identifySpeakers(messages) {
  if (!messages || messages.length === 0) {
    return [];
  }

  const speakerSet = new Set();
  messages.forEach(m => {
    if (m.senderName) speakerSet.add(m.senderName);
    else if (m.senderId) speakerSet.add(m.senderId);
  });

  return Array.from(speakerSet);
}

/**
 * Legacy stub for backward compatibility.
 */
export function extractContextStub(_messages) {
  throw new Error('Use extractContext instead');
}
