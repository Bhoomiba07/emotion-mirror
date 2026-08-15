/**
 * Solo Reflection session service (Phase 5 + Phase 6 AI integration).
 * In-memory storage — no database.
 * Now uses real Gemini AI with demo fallback.
 */

import { analyzeSoloConversation } from '../ai/index.js';
import { isGeminiAvailable } from '../ai/geminiProvider.js';

const sessions = new Map();

/** Demo emotional signals */
function getDemoEmotionalSignals(inputMethod) {
  if (inputMethod === 'describe') {
    return [
      { emoji: '😟', label: 'Concerned', confidence: 71, note: 'Possible signal' },
      { emoji: '🛡', label: 'Guarded', confidence: 58, note: 'Possible signal' },
    ];
  }
  
  return [
    { emoji: '😔', label: 'Hurt', confidence: 78, note: 'Possible signal' },
    { emoji: '😤', label: 'Frustrated', confidence: 64, note: 'Possible signal' },
  ];
}

/** Demo interpretation */
function getDemoInterpretation(inputMethod) {
  if (inputMethod === 'describe') {
    return 'Based on your description, they may feel that their boundaries were not respected in that moment.';
  }
  
  return 'They may feel that their perspective is not being fully heard or understood.';
}

/** Demo user communication signals */
function getDemoUserSignals(inputMethod) {
  return [
    {
      label: 'Emotional intensity',
      description: 'Your messages may have come across with heightened emotion, which could affect how they were received.',
    },
    {
      label: 'Repeated patterns',
      description: 'Phrases like "you always" or "you never" might suggest generalizations that could feel overwhelming.',
    },
    {
      label: 'Possible tone',
      description: 'The phrasing might have carried frustration, which may have contributed to the conversation direction.',
    },
  ];
}

/** Demo temperature trajectory */
function getDemoTemperature() {
  return {
    start: { value: 42, label: 'Calm' },
    middle: { value: 81, label: 'Heated' },
    end: { value: 56, label: 'Cooled' },
  };
}

/** Demo turning points */
function getDemoTurningPoints() {
  return [
    {
      moment: 'Early in the conversation',
      shift: 'The tone may have shifted from exploratory to more defensive when expectations were mentioned.',
    },
    {
      moment: 'During the middle section',
      shift: 'The conversation appeared to become more emotionally charged, possibly when past incidents were brought up.',
    },
    {
      moment: 'Toward the end',
      shift: 'Both perspectives seemed to soften slightly, suggesting a possible de-escalation.',
    },
  ];
}

/** Demo final reflection */
function getDemoReflection() {
  return [
    'The conversation began with relative calm but appeared to become more emotionally intense during the middle section.',
    'Both perspectives showed signs of frustration and vulnerability at different points.',
    'The conversation may have cooled somewhat toward the end, though underlying tensions might remain unresolved.',
    'This interpretation is based on limited context and represents possible patterns rather than definitive facts.',
  ];
}

/** Generate demo analysis (fallback) */
function generateDemoAnalysis(inputMethod) {
  return {
    demo: true,
    emotionalSignals: getDemoEmotionalSignals(inputMethod),
    interpretation: getDemoInterpretation(inputMethod),
    userSignals: getDemoUserSignals(inputMethod),
    temperature: getDemoTemperature(),
    turningPoints: getDemoTurningPoints(),
    reflection: getDemoReflection(),
  };
}

/**
 * Create a Solo analysis session.
 */
export async function createSoloSession({ inputMethod, inputText }) {
  if (!inputMethod || !['paste', 'describe', 'upload'].includes(inputMethod)) {
    throw Object.assign(new Error('Invalid input method.'), { status: 400 });
  }

  const trimmedText = inputText?.trim();
  if (!trimmedText) {
    throw Object.assign(new Error('Input text is required.'), { status: 400 });
  }

  const sessionId = crypto.randomUUID();
  let analysisResults;

  // Try AI analysis first, fallback to demo
  if (isGeminiAvailable()) {
    try {
      console.log(`Analyzing Solo session with Gemini AI (method: ${inputMethod})...`);
      analysisResults = await analyzeSoloConversation({
        inputText: trimmedText,
        inputMethod,
      });
      console.log('✓ Gemini AI analysis successful');
    } catch (error) {
      console.error('✗ Gemini AI analysis failed:', error.message);
      console.log('→ Falling back to demo data');
      analysisResults = generateDemoAnalysis(inputMethod);
    }
  } else {
    console.log('Gemini not configured - using demo data');
    analysisResults = generateDemoAnalysis(inputMethod);
  }

  const session = {
    sessionId,
    inputMethod,
    inputText: trimmedText,
    createdAt: new Date().toISOString(),
    analysisResults,
  };

  sessions.set(sessionId, session);
  return session;
}

/**
 * Get Solo session by ID.
 */
export function getSoloSession(sessionId) {
  return sessions.get(sessionId) ?? null;
}

/**
 * Upload handler — OCR not implemented.
 */
export function handleUpload() {
  throw Object.assign(
    new Error('Screenshot OCR is not yet implemented. Please use Paste Conversation or Describe What Happened.'),
    { status: 501 }
  );
}
