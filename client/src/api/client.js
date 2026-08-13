const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Thin REST client stub for future Solo mode and shared HTTP endpoints.
 * No mode/AI logic is implemented in Phase 1.
 */
export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}
