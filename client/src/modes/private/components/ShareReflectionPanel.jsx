import { useState } from 'react';

function ShareReflectionPanel({ onShare, onSkip, disabled, hasShared }) {
  const [emotionalSignals, setEmotionalSignals] = useState(true);
  const [privateInterpretation, setPrivateInterpretation] = useState(false);
  const [conversationSummary, setConversationSummary] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleShare() {
    setSubmitting(true);
    setError('');
    try {
      await onShare({
        emotionalSignals,
        privateInterpretation,
        conversationSummary,
      });
    } catch (err) {
      setError(err.message || 'Unable to share.');
    } finally {
      setSubmitting(false);
    }
  }

  if (hasShared) {
    return (
      <section className="complete-step" aria-label="Share reflection complete">
        <h2>Share Reflection</h2>
        <p className="section-copy">Your selected information has been shared.</p>
      </section>
    );
  }

  return (
    <section className="complete-step" aria-label="Share reflection">
      <h2>Share Reflection</h2>
      <p className="section-copy">
        Choose what you would like to share. Private AI interpretations are never shared unless
        you explicitly select them.
      </p>

      <div className="share-form">
        <p className="privacy-box__title">What would you like to share?</p>

        <label className="share-option">
          <input
            type="checkbox"
            checked={emotionalSignals}
            onChange={(event) => setEmotionalSignals(event.target.checked)}
            disabled={disabled || submitting}
          />
          <span>Emotional signals</span>
        </label>

        <label className="share-option">
          <input
            type="checkbox"
            checked={privateInterpretation}
            onChange={(event) => setPrivateInterpretation(event.target.checked)}
            disabled={disabled || submitting}
          />
          <span>My private interpretation</span>
        </label>

        <label className="share-option">
          <input
            type="checkbox"
            checked={conversationSummary}
            onChange={(event) => setConversationSummary(event.target.checked)}
            disabled={disabled || submitting}
          />
          <span>Conversation summary</span>
        </label>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="suggestion-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleShare}
          disabled={
            disabled ||
            submitting ||
            (!emotionalSignals && !privateInterpretation && !conversationSummary)
          }
        >
          {submitting ? 'Sharing...' : 'Share'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onSkip}
          disabled={disabled || submitting}
        >
          Continue without sharing
        </button>
      </div>
    </section>
  );
}

export default ShareReflectionPanel;
