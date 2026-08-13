function HowItWorksPage() {
  return (
    <section className="section">
      <h1>How It Works</h1>
      <p className="section-copy">
        Emotion Mirror analyzes language, context, emotional intensity, and conversation patterns.
        It presents possible emotional perspectives — not claims about what someone definitely feels.
      </p>
      <div className="mode-grid" style={{ marginTop: '1.5rem' }}>
        <article className="mode-card">
          <h3>1. Choose a mode</h3>
          <p>Live, Private, or Solo — based on whether the other person can participate.</p>
        </article>
        <article className="mode-card">
          <h3>2. Share conversation</h3>
          <p>Talk in real time, or paste / upload / describe a conversation in Solo mode.</p>
        </article>
        <article className="mode-card">
          <h3>3. See perspectives</h3>
          <p>
            Possible signals, conversation temperature, turning points, and optional suggestions when
            you ask.
          </p>
        </article>
      </div>
    </section>
  );
}

export default HowItWorksPage;
