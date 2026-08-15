const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `Request failed: ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export async function analyzePastedConversation(text) {
  const response = await fetch(`${API_BASE_URL}/solo/analyze-paste`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return parseResponse(response);
}

export async function analyzeDescription(description) {
  const response = await fetch(`${API_BASE_URL}/solo/analyze-describe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description }),
  });
  return parseResponse(response);
}

export async function getSoloResults(sessionId) {
  const response = await fetch(`${API_BASE_URL}/solo/results/${encodeURIComponent(sessionId)}`);
  return parseResponse(response);
}
