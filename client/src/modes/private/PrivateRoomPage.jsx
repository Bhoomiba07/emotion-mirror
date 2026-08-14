import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConversationPanel from '../live/components/ConversationPanel.jsx';
import PrivateMirrorPanel from './components/PrivateMirrorPanel.jsx';
import { usePrivateSocket } from './hooks/usePrivateSocket.js';
import {
  getOrCreateParticipantId,
  getStoredParticipantName,
  getStoredParticipantRole,
} from '../../services/privateSocket.js';
import './private.css';

function PrivateRoomPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [ending, setEnding] = useState(false);
  const [endError, setEndError] = useState('');

  const participantId = useMemo(() => getOrCreateParticipantId(code), [code]);
  const role = getStoredParticipantRole(code);
  const name = getStoredParticipantName(code);

  useEffect(() => {
    if (!role || !name) {
      navigate(`/private/join/${code}`, { replace: true });
    }
  }, [role, name, code, navigate]);

  const {
    connected,
    roomState,
    messages,
    privateMirror,
    error,
    ended,
    sendMessage,
    endConversation,
  } = usePrivateSocket({
    code,
    participantId,
    name: name || '',
    role: role || 'guest',
    enabled: Boolean(code && name && role),
  });

  useEffect(() => {
    if (ended) {
      navigate(`/private/complete/${code}`);
    }
  }, [ended, navigate, code]);

  async function handleEndConversation() {
    setEnding(true);
    setEndError('');
    try {
      await endConversation();
      navigate(`/private/complete/${code}`);
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
    <div className="private-room">
      <header className="private-room__header">
        <div className="private-room__brand">
          <span className="brand-mark" aria-hidden="true">
            ◌
          </span>
          <div>
            <p className="private-room__title">Emotion Mirror</p>
            <p className="private-room__mode">
              PRIVATE <span className={`private-room__dot ${connected ? 'private-room__dot--on' : ''}`} />
            </p>
          </div>
        </div>
        <div className="private-room__actions">
          <span className="private-room__code">{code?.toUpperCase()}</span>
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
        <p className="private-room__notice">
          Waiting for both participants ({activeCount}/2 connected).
        </p>
      )}

      {(error || endError) && <p className="form-error private-room__error">{error || endError}</p>}

      <div className="private-room__panels">
        <ConversationPanel
          messages={messages}
          currentParticipantId={participantId}
          onSend={sendMessage}
          disabled={!connected || roomState?.status === 'ended'}
        />
        <PrivateMirrorPanel mirror={privateMirror} />
      </div>

      <p className="private-room__footer-note">
        Shared conversation is visible to both participants. Private mirror panel is demo-only and
        delivered only to you via a private socket event.
      </p>
    </div>
  );
}

export default PrivateRoomPage;
