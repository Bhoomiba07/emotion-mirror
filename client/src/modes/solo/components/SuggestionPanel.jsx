import { useState } from 'react';
import '../solo-neon.css';

function SuggestionPanel() {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [declined, setDeclined] = useState(false);

  if (declined) {
    return (
      <section className="solo-analysis-panel solo-neon" aria-label="Communication suggestion declined">
        <div className="solo-panel__header">
          <h2>Communication Suggestion</h2>
        </div>
        <p className="solo-neon__note">
          No suggestion shown. You can start a new Solo Reflection anytime.
        </p>
      </section>
    );
  }

  if (!showSuggestion) {
    return (
      <section className="solo-analysis-panel solo-neon" aria-label="Optional communication suggestion">
        <div className="solo-panel__header">
          <h2>Communication Suggestion</h2>
        </div>

        <p className="solo-neon__note">
          Would you like a communication suggestion? This is optional assistance, not relationship
          advice.
        </p>

        <div className="solo-suggestion-actions">
          <button type="button" className="btn btn-primary" onClick={() => setShowSuggestion(true)}>
            Yes, show suggestion
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setDeclined(true)}>
            No thanks
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="solo-analysis-panel solo-neon" aria-label="Communication suggestion">
      <div className="solo-panel__header">
        <h2>Communication Suggestion</h2>
      </div>

      <p className="solo-neon__note">
        A possible next step for communication — not a judgment about who was right or wrong.
      </p>

      <div className="solo-suggestion-box">
        <div className="solo-suggestion-example">
          <p>
            <strong>Instead of generalizations:</strong>
          </p>
          <blockquote>&quot;You never listen to me.&quot;</blockquote>
          <p>
            <strong>Consider specific moments:</strong>
          </p>
          <blockquote>
            &quot;I felt unheard when I was trying to explain my concern about the schedule.&quot;
          </blockquote>
        </div>
      </div>

      <p className="solo-neon__disclaimer">
        This suggestion is based on common communication patterns and may not fit every situation.
      </p>
    </section>
  );
}

export default SuggestionPanel;
