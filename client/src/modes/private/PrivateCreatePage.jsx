import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPrivateSession } from '../../api/private.js';
import {
  getOrCreateParticipantId,
  storeParticipantName,
  storeParticipantRole,
} from '../../services/privateSocket.js';
import '../live/live.css';
import './private.css';

const CONVERSATION_TYPES = ['Relationship', 'Friendship', 'Family', 'Workplace', 'Other'];

function PrivateCreatePage() {
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
      const session = await createPrivateSession({ hostName, conversationType });
      const participantId = getOrCreateParticipantId(session.code);
      storeParticipantRole(session.code, 'host');
      storeParticipantName(session.code, hostName.trim());
      navigate(`/private/waiting/${session.code}`, {
        state: { inviteLink: session.inviteLink },
      });
    } catch (err) {
      setError(err.message || 'Unable to create private room.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="private-page">
      <div className="private-page__intro">
        <p className="eyebrow">Private Mirror</p>
        <h1>Create a private room</h1>
        <p className="section-copy">
          Both people participate, but each receives a completely private AI perspective. Neither
          person sees the other&apos;s private panel.
        </p>
      </div>

      <form className="private-form live-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="private-host-name">Your name</label>
          <input
            id="private-host-name"
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
                  name="privateConversationType"
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
          {loading ? 'Creating...' : 'Create Private Room'}
        </button>
      </form>
    </section>
  );
}

export default PrivateCreatePage;
