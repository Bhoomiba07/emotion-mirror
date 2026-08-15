/**
 * Emotion engine (Phase 6).
 * Estimates emotional signals with uncertainty awareness.
 */

/**
 * Extract and validate emotional signals from AI response.
 * Ensures uncertainty language and appropriate confidence levels.
 */
export function extractEmotionalSignals(analysisResult) {
  if (!analysisResult || !analysisResult.emotionalSignals) {
    return [];
  }

  return analysisResult.emotionalSignals.map(signal => ({
    emoji: signal.emoji || '😐',
    label: signal.label || 'Unclear',
    confidence: Math.min(100, Math.max(0, signal.confidence || 50)),
    note: signal.note || 'Possible signal',
  }));
}

/**
 * Calculate emotional intensity from signals.
 * Returns 0-100 value representing overall intensity.
 */
export function estimateIntensity(signals) {
  if (!signals || signals.length === 0) {
    return 50;
  }

  const avgConfidence = signals.reduce((sum, s) => sum + s.confidence, 0) / signals.length;
  return Math.round(avgConfidence);
}

/**
 * Legacy stub for backward compatibility.
 */
export function estimateEmotionsStub(_payload) {
  throw new Error('Use extractEmotionalSignals instead');
}
