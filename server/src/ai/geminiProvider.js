/**
 * Gemini AI provider for Emotion Mirror (Phase 6).
 * Uses Google Generative AI SDK with free tier.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env.js';
import { SYSTEM_INSTRUCTION } from './prompts.js';

let genAI = null;
let model = null;

/**
 * Initialize Gemini client.
 * @throws {Error} if API key is missing
 */
export function initializeGemini() {
  if (!env.geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  try {
    genAI = new GoogleGenerativeAI(env.geminiApiKey);
    // Use gemini-1.5-flash for free tier (fast, efficient)
    model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });
    
    console.log('✓ Gemini AI initialized successfully');
    return true;
  } catch (error) {
    console.error('✗ Failed to initialize Gemini:', error.message);
    throw error;
  }
}

/**
 * Check if Gemini is configured and ready.
 */
export function isGeminiAvailable() {
  return Boolean(env.geminiApiKey && model);
}

/**
 * Generate content using Gemini with structured JSON response.
 * @param {string} prompt - The analysis prompt
 * @returns {Promise<object>} Parsed JSON response
 */
export async function generateStructuredContent(prompt) {
  if (!isGeminiAvailable()) {
    throw new Error('Gemini is not available - API key not configured');
  }

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response (Gemini might wrap it in markdown)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in Gemini response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return parsed;
  } catch (error) {
    console.error('Gemini API error:', error.message);
    throw error;
  }
}

/**
 * Validate that a response contains expected fields.
 */
export function validateResponse(response, requiredFields) {
  for (const field of requiredFields) {
    if (!(field in response)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  return true;
}
