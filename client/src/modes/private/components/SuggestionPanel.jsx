import { useState } from 'react';

function SuggestionPanel() {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [declined, setDeclined] = useState(false);

  if (declined) {
    return (
      <section className="complete-step" aria-label="Communication suggestion declined">
        <h2>Communication suggestion</h2>
        <p className="section-copy">No suggestion shown. You can start a new conversation anytime.</p>
      </section>
    );
  }

  if (!showSuggestion) {
    return (
      <section className="complete-step" aria-label="Optional communication suggestion">
        <h2>Would you like a communication suggestion?</h2>
        <p className="section-copy">
          This is optional communication assistance — not relationship advice.
        </p>
        <div className="suggestion-actions">
          <button type="button" className="btn btn-primary" onClick={() => setShowSuggestion(true)}>
            Yes, show me
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setDeclined(true)}>
            No thanks
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="complete-step" aria-label="Communication suggestion">
      <h2>Communication suggestion</h2>
      <p className="section-copy">
        Demo example only. A possible next step is to clarify what you felt rather than making a
        general statement about the other person.
      </p>

      <div className="suggestion-box">
        <div className="suggestion-example">
          <p>
            <strong>Instead of:</strong>
          </p>
          <blockquote>&quot;You never listen.&quot;</blockquote>
          <p>
            <strong>Possible alternative:</strong>
          </p>
          <blockquote>
            &quot;I felt like my concern wasn&apos;t being heard in that moment.&quot;
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default SuggestionPanel;
