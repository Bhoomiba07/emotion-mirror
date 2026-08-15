/**
 * Temperature engine (Phase 6).
 * Estimates conversation emotional temperature (0-100).
 */

/**
 * Get temperature label from numeric value.
 * @param {number} value - Temperature 0-100
 * @returns {string} Label
 */
export function getTemperatureLabel(value) {
  if (value <= 40) return 'Calm';
  if (value <= 60) return 'Neutral';
  if (value <= 75) return 'Warm';
  if (value <= 90) return 'Heated';
  return 'Intense';
}

/**
 * Extract temperature trajectory from AI analysis.
 * Ensures values are within 0-100 range.
 */
export function extractTemperature(analysisResult) {
  if (!analysisResult || !analysisResult.temperature) {
    return {
      start: { value: 50, label: 'Neutral' },
      middle: { value: 50, label: 'Neutral' },
      end: { value: 50, label: 'Neutral' },
    };
  }

  const temp = analysisResult.temperature;
  
  return {
    start: {
      value: Math.min(100, Math.max(0, temp.start?.value || 50)),
      label: temp.start?.label || getTemperatureLabel(temp.start?.value || 50),
    },
    middle: {
      value: Math.min(100, Math.max(0, temp.middle?.value || 50)),
      label: temp.middle?.label || getTemperatureLabel(temp.middle?.value || 50),
    },
    end: {
      value: Math.min(100, Math.max(0, temp.end?.value || 50)),
      label: temp.end?.label || getTemperatureLabel(temp.end?.value || 50),
    },
  };
}

/**
 * Calculate current temperature for real-time analysis.
 */
export function calculateCurrentTemperature(analysisResult) {
  if (!analysisResult || !analysisResult.temperature) {
    return { current: 50, label: 'Neutral', trend: 'stable' };
  }

  const temp = analysisResult.temperature;
  const current = Math.min(100, Math.max(0, temp.current || 50));
  
  return {
    current,
    label: temp.label || getTemperatureLabel(current),
    trend: temp.trend || 'stable',
  };
}

/**
 * Legacy stub for backward compatibility.
 */
export function estimateTemperatureStub(_payload) {
  throw new Error('Use extractTemperature instead');
}
