import '../solo-neon.css';

function UserSignalsPanel({ signals }) {
  if (!signals || signals.length === 0) {
    return null;
  }

  return (
    <section className="solo-analysis-panel solo-neon" aria-label="Your communication signals">
      <div className="solo-panel__header">
        <h2>Your Communication Signals</h2>
      </div>

      <p className="solo-neon__note">
        How might your messages be coming across? This is self-reflection, not blame.
      </p>

      <div className="solo-user-signals">
        {signals.map((signal) => (
          <div key={signal.label} className="solo-user-signal">
            <h3>{signal.label}</h3>
            <p>{signal.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UserSignalsPanel;
