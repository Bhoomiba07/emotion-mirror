/**
 * Phase 3 smoke test for Live Conversation Socket.IO flow.
 * Run with: node scripts/test-live-flow.js (server must be on :4000)
 */
import { io } from 'socket.io-client';

const API = 'http://localhost:4000/api';
const SOCKET_URL = 'http://localhost:4000';

const LIVE_EVENTS = {
  JOIN: 'live:join',
  MESSAGE_SEND: 'live:message-send',
  MESSAGE_RECEIVED: 'live:message-received',
  END: 'live:end',
  ENDED: 'live:ended',
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const createRes = await fetch(`${API}/live/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hostName: 'Darshita', conversationType: 'Relationship' }),
  });
  const session = await createRes.json();
  if (!createRes.ok) throw new Error(session.message || 'Create failed');
  console.log('Session created:', session.code);

  const hostId = crypto.randomUUID();
  const guestId = crypto.randomUUID();
  const code = session.code;

  const host = io(SOCKET_URL, { autoConnect: false, transports: ['websocket'] });
  const guest = io(SOCKET_URL, { autoConnect: false, transports: ['websocket'] });

  const hostJoin = new Promise((resolve, reject) => {
    host.on('connect', () => {
      host.emit(LIVE_EVENTS.JOIN, { code, participantId: hostId, name: 'Darshita', role: 'host' }, (res) => {
        if (res?.ok) resolve(res);
        else reject(new Error(res?.message || 'Host join failed'));
      });
    });
    host.connect();
  });

  await hostJoin;
  console.log('Host joined');

  const guestJoin = new Promise((resolve, reject) => {
    guest.on('connect', () => {
      guest.emit(LIVE_EVENTS.JOIN, { code, participantId: guestId, name: 'Alex', role: 'guest' }, (res) => {
        if (res?.ok) resolve(res);
        else reject(new Error(res?.message || 'Guest join failed'));
      });
    });
    guest.connect();
  });

  const guestJoinResult = await guestJoin;
  console.log('Guest joined, status:', guestJoinResult.roomState.status);

  const messagePromise = new Promise((resolve) => {
    guest.on(LIVE_EVENTS.MESSAGE_RECEIVED, (msg) => resolve(msg));
  });

  host.emit(LIVE_EVENTS.MESSAGE_SEND, { text: 'I feel ignored.' }, (res) => {
    if (!res?.ok) throw new Error(res?.message || 'Send failed');
  });

  const received = await messagePromise;
  console.log('Message delivered:', received.text);

  const endPromise = new Promise((resolve) => {
    guest.on(LIVE_EVENTS.ENDED, (state) => resolve(state));
  });

  host.emit(LIVE_EVENTS.END, {}, (res) => {
    if (!res?.ok) throw new Error(res?.message || 'End failed');
  });

  const endedState = await endPromise;
  console.log('Conversation ended, status:', endedState.status);

  host.disconnect();
  guest.disconnect();
  console.log('Phase 3 live flow test passed.');
}

main().catch((err) => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
