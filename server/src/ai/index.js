/**
 * Shared AI service facade — all three modes will call into this later.
 * Phase 1 only prepares the module boundary.
 */
export async function analyzeConversationStub(_payload) {
  throw new Error('AI service is not implemented in Phase 1.');
}

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
