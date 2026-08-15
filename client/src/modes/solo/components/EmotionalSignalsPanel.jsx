import '../solo-neon.css';

function EmotionalSignalsPanel({ signals }) {
  if (!signals || signals.length === 0) {
    return null;
  }

  return (
    <section className="solo-analysis-panel solo-neon" aria-label="Emotional signals">
      <div className="solo-panel__header">
        <h2>Possible Emotional Signals</h2>
        <span className="solo-neon__badge">Demo Analysis</span>
      </div>

      <p className="solo-neon__note">
        These are possible emotional signals that might be present in the conversation.
      </p>

      <div className="solo-neon__signals">
        {signals.map((signal) => (
          <div key={signal.label} className="solo-neon__signal">
            <span className="solo-neon__signal-icon" aria-hidden="true">
              {signal.emoji}
            </span>
            <div>
              <p className="solo-neon__signal-label">
                {signal.label} — {signal.confidence}%
              </p>
              <p className="solo-neon__signal-meta">{signal.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EmotionalSignalsPanel;
