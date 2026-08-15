import 'dotenv/config';
import http from 'http';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { attachSockets } from './sockets/index.js';
import { initializeGemini, isGeminiAvailable } from './ai/geminiProvider.js';

const app = createApp();
const server = http.createServer(app);

attachSockets(server);

// Initialize Gemini AI (Phase 6)
try {
  if (env.geminiApiKey) {
    initializeGemini();
  } else {
    console.warn('⚠ GEMINI_API_KEY not configured - AI features will use fallback demo data');
  }
} catch (error) {
  console.error('⚠ Failed to initialize Gemini AI:', error.message);
  console.warn('⚠ AI features will use fallback demo data');
}

server.listen(env.port, () => {
  console.log(`Emotion Mirror API listening on http://localhost:${env.port}`);
  console.log(`AI Status: ${isGeminiAvailable() ? '✓ Gemini enabled' : '✗ Demo mode (configure GEMINI_API_KEY)'}`);
});

