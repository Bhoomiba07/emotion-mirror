import '../solo-neon.css';

function InterpretationPanel({ interpretation }) {
  if (!interpretation) {
    return null;
  }

  return (
    <section className="solo-analysis-panel solo-neon" aria-label="Interpretation">
      <div className="solo-panel__header">
        <h2>Possible Interpretation</h2>
      </div>

      <blockquote className="solo-neon__interpretation">&quot;{interpretation}&quot;</blockquote>

      <p className="solo-neon__disclaimer">
        This interpretation represents a possibility, not a definitive fact about another person's
        feelings.
      </p>
    </section>
  );
}

export default InterpretationPanel;
