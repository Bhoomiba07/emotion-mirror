import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConversationPanel from './components/ConversationPanel.jsx';
import TemperaturePanel from './components/TemperaturePanel.jsx';
import YourMirrorPanel from './components/YourMirrorPanel.jsx';
import { useLiveSocket } from './hooks/useLiveSocket.js';
import {
  getOrCreateParticipantId,
  getStoredParticipantName,
  getStoredParticipantRole,
} from '../../services/liveSocket.js';
import './live.css';

function LiveRoomPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [ending, setEnding] = useState(false);
  const [endError, setEndError] = useState('');

  const participantId = useMemo(() => getOrCreateParticipantId(code), [code]);
  const role = getStoredParticipantRole(code);
  const name = getStoredParticipantName(code);

  useEffect(() => {
    if (!role || !name) {
      navigate(`/live/join/${code}`, { replace: true });
    }
  }, [role, name, code, navigate]);

  const { connected, roomState, messages, error, ended, liveMirror, sendMessage, endConversation } =
    useLiveSocket({
      code,
      participantId,
      name: name || '',
      role: role || 'guest',
      enabled: Boolean(code && name && role),
    });

  useEffect(() => {
    if (ended) {
      navigate(`/live/ended/${code}`);
    }
  }, [ended, navigate, code]);

  async function handleEndConversation() {
    setEnding(true);
    setEndError('');
    try {
      await endConversation();
      navigate(`/live/ended/${code}`);
    } catch (err) {
      setEndError(err.message || 'Unable to end conversation.');
    } finally {
      setEnding(false);
    }
  }

  if (!role || !name) {
    return null;
  }

  const activeCount = roomState?.participants?.filter((p) => p.connected).length ?? 0;
  const isActive = roomState?.status === 'active';

  return (
    <div className="live-room">
      <header className="live-room__header">
        <div className="live-room__brand">
          <span className="brand-mark" aria-hidden="true">
            ◌
          </span>
          <div>
            <p className="live-room__title">Emotion Mirror</p>
            <p className="live-room__mode">
              LIVE <span className={`live-room__dot ${connected ? 'live-room__dot--on' : ''}`} />
            </p>
          </div>
        </div>
        <div className="live-room__actions">
          <span className="live-room__code">{code?.toUpperCase()}</span>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleEndConversation}
            disabled={ending}
          >
            {ending ? 'Ending...' : 'End Conversation'}
          </button>
        </div>
      </header>

      {!isActive && (
        <p className="live-room__notice">
          Waiting for both participants ({activeCount}/2 connected).
        </p>
      )}

      {(error || endError) && <p className="form-error live-room__error">{error || endError}</p>}

      <div className="live-room__panels">
        <YourMirrorPanel liveMirror={liveMirror} />
        <ConversationPanel
          messages={messages}
          currentParticipantId={participantId}
          onSend={sendMessage}
          disabled={!connected || roomState?.status === 'ended'}
        />
        <TemperaturePanel />
      </div>

      <p className="live-room__footer-note">
        {liveMirror?.demo === false
          ? 'AI analysis updates in real-time. Temperature panel remains static (demo).'
          : 'Demo mirror and temperature values shown. Configure GEMINI_API_KEY for AI analysis.'}
      </p>
    </div>
  );
}

export default LiveRoomPage;
