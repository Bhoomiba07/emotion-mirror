import '../solo-neon.css';

function ReflectionPanel({ reflection }) {
  if (!reflection || reflection.length === 0) {
    return null;
  }

  return (
    <section className="solo-analysis-panel solo-neon" aria-label="Final reflection">
      <div className="solo-panel__header">
        <h2>Final Conversation Reflection</h2>
      </div>

      <div className="solo-reflection-content">
        {reflection.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default ReflectionPanel;
