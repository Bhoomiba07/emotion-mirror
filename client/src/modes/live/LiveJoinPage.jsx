import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getLiveSessionInfo } from '../../api/live.js';
import {
  getOrCreateParticipantId,
  storeParticipantName,
  storeParticipantRole,
} from '../../services/liveSocket.js';
import './live.css';

const CONSENT_ITEMS = [
  'AI interpretations are estimates',
  "Neither person sees the other's private AI panel",
  "Emotion Mirror doesn't decide who is right",
];

function LiveJoinPage() {
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
        const info = await getLiveSessionInfo(code);
        setSession(info);
      } catch (err) {
        if (err.status === 410) {
          navigate(`/live/ended/${code}`);
          return;
        }
        setError(err.message || 'This conversation is not available.');
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [code, navigate]);

  useEffect(() => {
    if (session && !session.canJoin && session.status !== 'ended') {
      setError('This conversation already has two participants.');
    }
  }, [session]);

  function handleJoin() {
    const trimmedName = guestName.trim();
    if (!trimmedName || !consentChecked) return;

    getOrCreateParticipantId(code);
    storeParticipantRole(code, 'guest');
    storeParticipantName(code, trimmedName);
    navigate(`/live/room/${code}`);
  }

  if (loading) {
    return (
      <section className="live-page">
        <div className="live-card live-card--center">
          <p className="section-copy">Loading conversation...</p>
        </div>
      </section>
    );
  }

  if (error || !session) {
    return (
      <section className="live-page">
        <div className="live-card live-card--center">
          <h1>Unable to join</h1>
          <p className="form-error">{error || 'Conversation not found.'}</p>
          <Link to="/" className="btn btn-secondary">
            Return home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="live-page">
      <div className="live-card live-card--center">
        <p className="eyebrow">Join Conversation</p>
        <h1>
          You&apos;re joining:
          <span className="join-title">&quot;{session.title}&quot;</span>
        </h1>
        <p className="section-copy">Hosted by {session.hostName}</p>

        <div className="form-field">
          <label htmlFor="guest-name">Your name</label>
          <input
            id="guest-name"
            type="text"
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            placeholder="Enter your name"
            maxLength={60}
          />
        </div>

        <div className="consent-box">
          <p className="consent-box__title">Before continuing:</p>
          <ul className="consent-list">
            {CONSENT_ITEMS.map((item) => (
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
            <span>I understand these terms and want to join.</span>
          </label>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleJoin}
          disabled={!consentChecked || !guestName.trim() || (session && !session.canJoin)}
        >
          I Understand &amp; Join
        </button>
      </div>
    </section>
  );
}

export default LiveJoinPage;
