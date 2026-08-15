import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzePastedConversation } from '../../api/solo.js';
import './solo.css';

function SoloPastePage() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await analyzePastedConversation(text);
      navigate(`/solo/results/${result.sessionId}`);
    } catch (err) {
      setError(err.message || 'Unable to analyze conversation.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="solo-page">
      <div className="solo-page__intro">
        <p className="eyebrow">Solo Reflection</p>
        <h1>Paste Conversation</h1>
        <p className="section-copy">
          Paste the text of the conversation you'd like to reflect on. This analysis is private to
          you.
        </p>
      </div>

      <form className="solo-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="conversation-text">Conversation text</label>
          <textarea
            id="conversation-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Paste the conversation here..."
            required
            rows={12}
            maxLength={5000}
          />
          <p className="form-hint">{text.length} / 5000 characters</p>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="solo-form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Conversation'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/solo')}
            disabled={loading}
          >
            Back
          </button>
        </div>
      </form>
    </section>
  );
}

export default SoloPastePage;
