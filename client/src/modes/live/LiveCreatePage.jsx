import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLiveSession } from '../../api/live.js';
import {
  getOrCreateParticipantId,
  storeParticipantName,
  storeParticipantRole,
} from '../../services/liveSocket.js';
import './live.css';

const CONVERSATION_TYPES = ['Relationship', 'Friendship', 'Family', 'Workplace', 'Other'];

function LiveCreatePage() {
  const navigate = useNavigate();
  const [hostName, setHostName] = useState('');
  const [conversationType, setConversationType] = useState('Relationship');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const session = await createLiveSession({ hostName, conversationType });
      const participantId = getOrCreateParticipantId(session.code);
      storeParticipantRole(session.code, 'host');
      storeParticipantName(session.code, hostName.trim());
      navigate(`/live/waiting/${session.code}`, {
        state: { inviteLink: session.inviteLink },
      });
    } catch (err) {
      setError(err.message || 'Unable to create conversation.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="live-page">
      <div className="live-page__intro">
        <p className="eyebrow">Live Conversation</p>
        <h1>Create a live conversation</h1>
        <p className="section-copy">
          Both people participate in real time. Set up your session, then invite the other person to
          join.
        </p>
      </div>

      <form className="live-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="host-name">Your name</label>
          <input
            id="host-name"
            type="text"
            value={hostName}
            onChange={(event) => setHostName(event.target.value)}
            placeholder="Darshita"
            required
            maxLength={60}
          />
        </div>

        <fieldset className="form-field">
          <legend>Conversation type</legend>
          <div className="radio-group">
            {CONVERSATION_TYPES.map((type) => (
              <label key={type} className="radio-option">
                <input
                  type="radio"
                  name="conversationType"
                  value={type}
                  checked={conversationType === type}
                  onChange={() => setConversationType(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {error ? <p className="form-error">{error}</p> : null}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Live Conversation'}
        </button>
      </form>
    </section>
  );
}

export default LiveCreatePage;
