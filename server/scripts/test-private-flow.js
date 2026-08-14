/**
 * Phase 4 smoke + privacy test for Private Mirror Socket.IO flow.
 * Run with: npm run test:private (server must be on :4000)
 */
import { io } from 'socket.io-client';

const API = 'http://localhost:4000/api';
const SOCKET_URL = 'http://localhost:4000';

const PRIVATE_EVENTS = {
  JOIN: 'private:join',
  PRIVATE_MIRROR: 'private:mirror',
  MESSAGE_SEND: 'private:message-send',
  MESSAGE_RECEIVED: 'private:message-received',
  ROOM_STATE: 'private:room-state',
  END: 'private:end',
  ENDED: 'private:ended',
  SHARE_REFLECTION: 'private:share-reflection',
  SHARE_UPDATED: 'private:share-updated',
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function connectAndJoin(client, payload) {
  return new Promise((resolve, reject) => {
    client.on('connect', () => {
      client.emit(PRIVATE_EVENTS.JOIN, payload, (res) => {
        if (res?.ok) resolve(res);
        else reject(new Error(res?.message || 'Join failed'));
      });
    });
    client.connect();
  });
}

async function main() {
  const createRes = await fetch(`${API}/private/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hostName: 'Darshita', conversationType: 'Relationship' }),
  });
  const session = await createRes.json();
  if (!createRes.ok) throw new Error(session.message || 'Create failed');

  const code = session.code;
  const hostId = crypto.randomUUID();
  const guestId = crypto.randomUUID();

  const host = io(SOCKET_URL, { autoConnect: false, transports: ['websocket'] });
  const guest = io(SOCKET_URL, { autoConnect: false, transports: ['websocket'] });

  let hostMirror = null;
  let guestMirror = null;
  let hostRoomStates = [];
  let guestRoomStates = [];

  host.on(PRIVATE_EVENTS.PRIVATE_MIRROR, (data) => {
    hostMirror = data;
  });
  guest.on(PRIVATE_EVENTS.PRIVATE_MIRROR, (data) => {
    guestMirror = data;
  });
  host.on(PRIVATE_EVENTS.ROOM_STATE, (state) => {
    hostRoomStates.push(state);
  });
  guest.on(PRIVATE_EVENTS.ROOM_STATE, (state) => {
    guestRoomStates.push(state);
  });

  await connectAndJoin(host, {
    code,
    participantId: hostId,
    name: 'Darshita',
    role: 'host',
  });
  console.log('Host joined private room');

  await connectAndJoin(guest, {
    code,
    participantId: guestId,
    name: 'Alex',
    role: 'guest',
  });
  console.log('Guest joined private room');

  await delay(200);

  if (!hostMirror || !guestMirror) {
    throw new Error('Private mirror data was not delivered to participants.');
  }

  if (hostMirror.signals[0].label !== 'Hurt') {
    throw new Error('Host should receive mirror of guest (Hurt signal).');
  }
  if (guestMirror.signals[0].label !== 'Anxious') {
    throw new Error('Guest should receive mirror of host (Anxious signal).');
  }
  console.log('Private mirrors differ per participant — OK');

  for (const state of [...hostRoomStates, ...guestRoomStates]) {
    if (state.privateMirror || state.mirror) {
      throw new Error('ROOM_STATE must not contain private mirror data.');
    }
  }
  console.log('ROOM_STATE contains no private mirror data — OK');

  const messagePromise = new Promise((resolve) => {
    guest.on(PRIVATE_EVENTS.MESSAGE_RECEIVED, (msg) => resolve(msg));
  });

  host.emit(PRIVATE_EVENTS.MESSAGE_SEND, { text: 'I feel unheard.' }, (res) => {
    if (!res?.ok) throw new Error(res?.message || 'Send failed');
  });

  const received = await messagePromise;
  console.log('Message delivered:', received.text);

  const endPromise = new Promise((resolve) => {
    guest.on(PRIVATE_EVENTS.ENDED, (state) => resolve(state));
  });

  host.emit(PRIVATE_EVENTS.END, {}, (res) => {
    if (!res?.ok) throw new Error(res?.message || 'End failed');
  });

  const endedState = await endPromise;
  console.log('Conversation ended, status:', endedState.status);

  const sharePromise = new Promise((resolve) => {
    guest.on(PRIVATE_EVENTS.SHARE_UPDATED, (payload) => resolve(payload));
  });

  host.emit(
    PRIVATE_EVENTS.SHARE_REFLECTION,
    { selection: { emotionalSignals: true, privateInterpretation: false, conversationSummary: false } },
    (res) => {
      if (!res?.ok) throw new Error(res?.message || 'Share failed');
    },
  );

  const shared = await sharePromise;
  if (!shared.shared?.emotionalSignals) {
    throw new Error('Only selected share fields should be public.');
  }
  if (shared.shared?.privateInterpretation) {
    throw new Error('Unselected private interpretation must not be shared.');
  }
  console.log('Share reflection respects selection — OK');

  host.disconnect();
  guest.disconnect();
  console.log('Phase 4 private flow test passed.');
}

main().catch((err) => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
