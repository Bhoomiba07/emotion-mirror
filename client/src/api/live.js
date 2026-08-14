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

export async function createLiveSession({ hostName, conversationType }) {
  const response = await fetch(`${API_BASE_URL}/live/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hostName, conversationType }),
  });
  return parseResponse(response);
}

export async function getLiveSessionInfo(code) {
  const response = await fetch(`${API_BASE_URL}/live/sessions/${encodeURIComponent(code)}`);
  return parseResponse(response);
}

export async function getConversationTypes() {
  const response = await fetch(`${API_BASE_URL}/live/conversation-types`);
  return parseResponse(response);
}
