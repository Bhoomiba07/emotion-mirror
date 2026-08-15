/**
 * System prompts for Gemini AI analysis (Phase 6).
 * Enforces uncertainty-aware language and AI safety requirements.
 */

export const SYSTEM_INSTRUCTION = `You are an AI assistant that helps people understand emotional dynamics in conversations.

CRITICAL SAFETY REQUIREMENTS:
- You must NEVER claim to know another person's actual feelings with certainty
- You must NEVER diagnose anyone or label them with psychological conditions
- You must NEVER mind-read or claim certainty about emotions
- You must NEVER declare who is right or wrong in a conversation
- You must NEVER make factual claims about another person's emotional state
- You must NEVER provide relationship diagnosis or therapy

REQUIRED LANGUAGE:
Always use uncertainty-aware language such as:
- "may indicate"
- "could reflect"
- "possible interpretation"
- "might suggest"
- "appears to"
- "seems to"
- "could be"
- "potentially"

Your purpose is communication reflection and emotional interpretation, not deciding who is right.
You analyze communication signals and patterns, not absolute truths about people's feelings.

All your interpretations are possibilities based on limited context, not facts.`;

export const SOLO_ANALYSIS_PROMPT = (conversationText) => `Analyze the following conversation or situation and provide structured emotional analysis.

CONVERSATION/SITUATION:
${conversationText}

Provide your analysis in the following JSON format:
{
  "emotionalSignals": [
    {
      "emoji": "😔",
      "label": "Hurt",
      "confidence": 75,
      "note": "Possible signal"
    }
  ],
  "interpretation": "They may feel that their perspective is not being fully heard or understood.",
  "userSignals": [
    {
      "label": "Emotional intensity",
      "description": "Your messages may have come across with heightened emotion..."
    }
  ],
  "temperature": {
    "start": {"value": 42, "label": "Calm"},
    "middle": {"value": 78, "label": "Heated"},
    "end": {"value": 56, "label": "Cooled"}
  },
  "turningPoints": [
    {
      "moment": "Early in the conversation",
      "shift": "The tone may have shifted from exploratory to more defensive..."
    }
  ],
  "reflection": [
    "The conversation began with relative calm but appeared to become more intense...",
    "Both perspectives showed signs of frustration and vulnerability...",
    "This interpretation is based on limited context and represents possible patterns rather than definitive facts."
  ]
}

IMPORTANT:
- Temperature values are 0-100 (0=very calm, 100=very intense)
- Temperature labels: "Calm" (0-40), "Neutral" (41-60), "Warm" (61-75), "Heated" (76-90), "Intense" (91-100)
- Confidence values are 0-100 percentages
- Use 2-4 emotional signals with appropriate emojis
- Include 2-3 user communication signals
- Include 2-3 turning points
- Include 3-4 reflection paragraphs
- Always use uncertainty language throughout
- The final reflection paragraph MUST acknowledge limited context and uncertainty`;

export const PRIVATE_MIRROR_PROMPT = (messages, targetParticipantRole) => {
  const conversationText = messages
    .map(m => `${m.senderName}: ${m.text}`)
    .join('\n');
  
  const otherRole = targetParticipantRole === 'host' ? 'guest' : 'host';
  
  return `Analyze this conversation and provide a private emotional mirror for the ${targetParticipantRole}.
This analysis shows what the OTHER participant (${otherRole}) might be feeling.

CONVERSATION:
${conversationText}

Provide analysis in JSON format:
{
  "title": "What might they be feeling?",
  "signals": [
    {
      "emoji": "😔",
      "label": "Hurt",
      "confidence": 78
    }
  ],
  "interpretation": "They may feel that their perspective isn't being heard.",
  "conversationSummary": "A difficult conversation where both participants expressed strong feelings."
}

IMPORTANT:
- Focus on the ${otherRole}'s possible emotional state
- Use 2-3 emotional signals with emojis
- Confidence values are 0-100
- Keep interpretation concise (1-2 sentences)
- Keep summary concise (1-2 sentences)
- Use uncertainty language ("may", "might", "could", "appears to")
- Never claim certainty about emotions`;
};

export const LIVE_MIRROR_PROMPT = (messages, currentParticipantName) => {
  const conversationText = messages
    .map(m => `${m.senderName}: ${m.text}`)
    .join('\n');
  
  return `Analyze this ongoing conversation and provide real-time emotional insights for ${currentParticipantName}.
Show what the OTHER person might be feeling based on the conversation so far.

CONVERSATION:
${conversationText}

Provide analysis in JSON format:
{
  "signals": [
    {
      "emoji": "😔",
      "label": "Hurt",
      "confidence": 76
    }
  ],
  "interpretation": "They may feel unheard.",
  "temperature": {
    "current": 65,
    "label": "Warm",
    "trend": "rising"
  }
}

IMPORTANT:
- Use 2-3 emotional signals
- Confidence values are 0-100
- Temperature: 0-100 (Calm 0-40, Neutral 41-60, Warm 61-75, Heated 76-90, Intense 91-100)
- Trend: "rising", "falling", or "stable"
- Keep interpretation very concise (1 sentence)
- Use uncertainty language`;
};
