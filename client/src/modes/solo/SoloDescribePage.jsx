import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeDescription } from '../../api/solo.js';
import './solo.css';

function SoloDescribePage() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await analyzeDescription(description);
      navigate(`/solo/results/${result.sessionId}`);
    } catch (err) {
      setError(err.message || 'Unable to analyze description.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="solo-page">
      <div className="solo-page__intro">
        <p className="eyebrow">Solo Reflection</p>
        <h1>Describe What Happened</h1>
        <p className="section-copy">
          Describe the conversation or situation in your own words. The analysis will be based on
          your description rather than the original conversation text.
        </p>
      </div>

      <form className="solo-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="description-text">Your description</label>
          <textarea
            id="description-text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe what happened in the conversation..."
            required
            rows={12}
            maxLength={3000}
          />
          <p className="form-hint">{description.length} / 3000 characters</p>
        </div>

        <p className="solo-note">
          <strong>Note:</strong> Because this is based on your description rather than the actual
          conversation, the interpretation may have lower confidence than with pasted text.
        </p>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="solo-form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Description'}
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

export default SoloDescribePage;
