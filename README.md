# Emotion Mirror

AI-powered emotional understanding platform.

## Current status — Phase 3

- React (Vite) frontend with routing and layout
- Node.js + Express backend with modular architecture
- **Live Conversation mode** — session creation, invite/join, consent, real-time messaging via Socket.IO
- Private Mirror and Solo Reflection remain placeholders
- No AI analysis, MongoDB, or authentication yet

## Run locally

Install dependencies:

```bash
npm run install:all
```

Start the API (port 4000):

```bash
npm run dev:server
```

Start the frontend (port 5173):

```bash
npm run dev:client
```

Health check: `http://localhost:4000/health`

## Live Conversation flow (Phase 3)

1. `/live` — create session (name + conversation type)
2. `/live/waiting/:code` — host sees session code and invite link
3. `/live/join/:code` — guest consent + join
4. `/live/room/:code` — three-panel live room (demo mirror/temperature, real-time messages)
5. `/live/ended/:code` — conversation ended

## Spec

Product requirements live in `explaination_emo_mirror.pdf`.

## Future database rule

When persistence is added, use **MongoDB Atlas only** via environment variables — never local MongoDB.
