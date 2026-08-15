/**
 * Shared AI service facade (Phase 6) — all three modes call into this.
 * Orchestrates the 9-step AI pipeline using Gemini.
 */

import { isGeminiAvailable, generateStructuredContent, validateResponse } from './geminiProvider.js';
import { SOLO_ANALYSIS_PROMPT, PRIVATE_MIRROR_PROMPT, LIVE_MIRROR_PROMPT } from './prompts.js';
import { extractContext, identifySpeakers } from './contextEngine.js';
import { extractEmotionalSignals, estimateIntensity } from './emotionEngine.js';
import { extractTemperature, calculateCurrentTemperature } from './temperatureEngine.js';

export const AI_PIPELINE_STEPS = [
  'speakerIdentification',
  'contextExtraction',
  'messageLevelAnalysis',
  'emotionEstimation',
  'intensityEstimation',
  'conversationTemperature',
  'emotionalTrend',
  'turningPoints',
  'finalReflection',
];

/**
 * Analyze conversation for Solo Reflection mode.
 * Returns structured analysis matching Solo UI requirements.
 * 
 * @param {Object} payload - Analysis request
 * @param {string} payload.inputText - Conversation text or description
 * @param {string} payload.inputMethod - 'paste', 'describe', or 'upload'
 * @returns {Promise<Object>} Structured analysis result
 */
export async function analyzeSoloConversation(payload) {
  const { inputText, inputMethod } = payload;

  if (!inputText) {
    throw new Error('Input text is required');
  }

  // Check if Gemini is available
  if (!isGeminiAvailable()) {
    console.warn('Gemini not available - would fall back to demo data');
    throw new Error('Gemini AI is not configured');
  }

  try {
    // Generate AI analysis
    const prompt = SOLO_ANALYSIS_PROMPT(inputText);
    const result = await generateStructuredContent(prompt);

    // Validate required fields
    validateResponse(result, [
      'emotionalSignals',
      'interpretation',
      'userSignals',
      'temperature',
      'turningPoints',
      'reflection',
    ]);

    // Structure the result to match Solo UI expectations
    return {
      demo: false,
      aiGenerated: true,
      emotionalSignals: extractEmotionalSignals(result),
      interpretation: result.interpretation,
      userSignals: result.userSignals || [],
      temperature: extractTemperature(result),
      turningPoints: result.turningPoints || [],
      reflection: Array.isArray(result.reflection) ? result.reflection : [result.reflection],
    };
  } catch (error) {
    console.error('Solo AI analysis failed:', error.message);
    throw error;
  }
}

/**
 * Analyze conversation for Private Mirror mode.
 * Returns participant-specific private emotional mirror.
 * 
 * @param {Object} payload - Analysis request
 * @param {Array} payload.messages - Conversation messages
 * @param {string} payload.targetParticipantRole - 'host' or 'guest'
 * @returns {Promise<Object>} Private mirror data
 */
export async function analyzePrivateMirror(payload) {
  const { messages, targetParticipantRole } = payload;

  if (!messages || messages.length === 0) {
    throw new Error('Messages are required');
  }

  if (!isGeminiAvailable()) {
    console.warn('Gemini not available - would fall back to demo data');
    throw new Error('Gemini AI is not configured');
  }

  try {
    const prompt = PRIVATE_MIRROR_PROMPT(messages, targetParticipantRole);
    const result = await generateStructuredContent(prompt);

    validateResponse(result, ['signals', 'interpretation']);

    return {
      demo: false,
      aiGenerated: true,
      title: result.title || 'What might they be feeling?',
      signals: result.signals || [],
      interpretation: result.interpretation,
      conversationSummary: result.conversationSummary || '',
    };
  } catch (error) {
    console.error('Private mirror AI analysis failed:', error.message);
    throw error;
  }
}

/**
 * Analyze conversation for Live mode.
 * Returns real-time emotional insights.
 * 
 * @param {Object} payload - Analysis request
 * @param {Array} payload.messages - Current conversation messages
 * @param {string} payload.currentParticipantName - Name of current participant
 * @returns {Promise<Object>} Live mirror data
 */
export async function analyzeLiveMirror(payload) {
  const { messages, currentParticipantName } = payload;

  if (!messages || messages.length === 0) {
    throw new Error('Messages are required');
  }

  if (!isGeminiAvailable()) {
    console.warn('Gemini not available - would fall back to demo data');
    throw new Error('Gemini AI is not configured');
  }

  try {
    const prompt = LIVE_MIRROR_PROMPT(messages, currentParticipantName);
    const result = await generateStructuredContent(prompt);

    validateResponse(result, ['signals', 'interpretation']);

    return {
      demo: false,
      aiGenerated: true,
      signals: result.signals || [],
      interpretation: result.interpretation,
      temperature: result.temperature ? calculateCurrentTemperature(result) : null,
    };
  } catch (error) {
    console.error('Live mirror AI analysis failed:', error.message);
    throw error;
  }
}

/**
 * Legacy stub for backward compatibility.
 */
export async function analyzeConversationStub(_payload) {
  throw new Error('Use mode-specific analysis functions instead');
}

// Export helper functions
export { extractContext, identifySpeakers, extractEmotionalSignals, estimateIntensity };
