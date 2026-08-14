import 'dotenv/config';
import http from 'http';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { attachSockets } from './sockets/index.js';

const app = createApp();
const server = http.createServer(app);

attachSockets(server);

server.listen(env.port, () => {
  console.log(`Emotion Mirror API listening on http://localhost:${env.port}`);
});
