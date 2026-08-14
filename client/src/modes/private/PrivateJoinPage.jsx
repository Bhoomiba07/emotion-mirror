import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPrivateSessionInfo } from '../../api/private.js';
import {
  getOrCreateParticipantId,
  storeParticipantName,
  storeParticipantRole,
} from '../../services/privateSocket.js';
import '../live/live.css';
import './private.css';

const PRIVACY_ITEMS = [
  'The conversation is shared between both participants.',
  'Each participant has a private AI perspective.',
  "Neither participant sees the other's private AI panel.",
];

function PrivateJoinPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [guestName, setGuestName] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSession() {
      setLoading(true);
      setError('');
      try {
        const info = await getPrivateSessionInfo(code);
        setSession(info);
      } catch (err) {
        if (err.status === 410) {
          navigate(`/private/complete/${code}`);
          return;
        }
        setError(err.message || 'This private room is not available.');
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [code, navigate]);

  useEffect(() => {
    if (session && !session.canJoin) {
      setError('This private room already has two participants.');
    }
  }, [session]);

  function handleJoin() {
    const trimmedName = guestName.trim();
    if (!trimmedName || !consentChecked) return;

    getOrCreateParticipantId(code);
    storeParticipantRole(code, 'guest');
    storeParticipantName(code, trimmedName);
    navigate(`/private/room/${code}`);
  }

  if (loading) {
    return (
      <section className="private-page">
        <div className="private-card private-card--center">
          <p className="section-copy">Loading private room...</p>
        </div>
      </section>
    );
  }

  if (error || !session) {
    return (
      <section className="private-page">
        <div className="private-card private-card--center">
          <h1>Unable to join</h1>
          <p className="form-error">{error || 'Private room not found.'}</p>
          <Link to="/" className="btn btn-secondary">
            Return home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="private-page">
      <div className="private-card private-card--center">
        <p className="eyebrow">Private Mirror</p>
        <h1>
          You&apos;re joining:
          <span className="join-title">&quot;{session.title}&quot;</span>
        </h1>
        <p className="section-copy">Hosted by {session.hostName}</p>

        <div className="form-field" style={{ width: '100%' }}>
          <label htmlFor="private-guest-name">Your name</label>
          <input
            id="private-guest-name"
            type="text"
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            placeholder="Enter your name"
            maxLength={60}
          />
        </div>

        <div className="privacy-box">
          <p className="privacy-box__title">Before continuing, understand:</p>
          <ul className="privacy-list">
            {PRIVACY_ITEMS.map((item) => (
              <li key={item}>
                <span aria-hidden="true">✓</span> {item}
              </li>
            ))}
          </ul>
          <label className="consent-check">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(event) => setConsentChecked(event.target.checked)}
            />
            <span>I understand these privacy terms and want to join.</span>
          </label>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleJoin}
          disabled={!consentChecked || !guestName.trim() || !session.canJoin}
        >
          I Understand &amp; Join
        </button>
      </div>
    </section>
  );
}

export default PrivateJoinPage;
