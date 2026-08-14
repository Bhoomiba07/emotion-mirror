import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getPrivateSessionInfo } from '../../api/private.js';
import {
  getOrCreateParticipantId,
  getStoredParticipantName,
  getStoredParticipantRole,
} from '../../services/privateSocket.js';
import { usePrivateSocket } from './hooks/usePrivateSocket.js';
import '../live/live.css';
import './private.css';

function PrivateWaitingPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [inviteLink, setInviteLink] = useState(location.state?.inviteLink || '');
  const [copied, setCopied] = useState(false);
  const [sessionError, setSessionError] = useState('');

  const participantId = useMemo(() => getOrCreateParticipantId(code), [code]);
  const role = getStoredParticipantRole(code) || 'host';
  const name = getStoredParticipantName(code) || 'Host';

  const { connected, roomState, error, ended } = usePrivateSocket({
    code,
    participantId,
    name,
    role,
    enabled: Boolean(code),
  });

  useEffect(() => {
    async function loadSession() {
      try {
        const session = await getPrivateSessionInfo(code);
        if (!inviteLink) {
          setInviteLink(`${window.location.origin}/private/join/${session.code}`);
        }
      } catch (err) {
        setSessionError(err.message || 'Unable to load private room.');
      }
    }

    loadSession();
  }, [code, inviteLink]);

  useEffect(() => {
    if (ended) {
      navigate(`/private/complete/${code}`);
      return;
    }

    const activeParticipants = roomState?.participants?.filter((p) => p.connected) ?? [];
    if (activeParticipants.length >= 2 && roomState?.status === 'active') {
      navigate(`/private/room/${code}`);
    }
  }, [roomState, ended, navigate, code]);

  async function handleCopy() {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const waiting = (roomState?.participants?.filter((p) => p.connected).length ?? 1) < 2;

  return (
    <section className="private-page">
      <div className="private-card private-card--center">
        <p className="eyebrow">Private Mirror</p>
        <h1>Your private conversation is ready</h1>

        <div className="session-code" aria-label="Session code">
          {code?.toUpperCase()}
        </div>

        <button type="button" className="btn btn-secondary" onClick={handleCopy} disabled={!inviteLink}>
          {copied ? 'Link copied' : 'Copy Invite Link'}
        </button>

        <div className="waiting-status">
          <span className={`waiting-dot ${waiting ? 'waiting-dot--active' : ''}`} aria-hidden="true" />
          <p>{waiting ? 'Waiting for participant...' : 'Participant connected'}</p>
          <p className="waiting-status__sub">
            {connected ? 'You are connected to the private room.' : 'Connecting...'}
          </p>
        </div>

        {(error || sessionError) && <p className="form-error">{error || sessionError}</p>}

        <Link to="/choose" className="btn btn-secondary">
          Back to Choose Experience
        </Link>
      </div>
    </section>
  );
}

export default PrivateWaitingPage;
