import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <section className="hero">
        <h1>Understand what words don&apos;t say.</h1>
        <p className="hero-lead">
          AI-powered emotional understanding for difficult conversations.
        </p>
        <p className="hero-support">
          Understand their perspective without assuming you know exactly what they feel.
        </p>
        <div className="hero-actions">
          <Link to="/choose" className="btn btn-primary">
            Start Understanding
          </Link>
          <Link to="/how-it-works" className="btn btn-secondary">
            See How It Works
          </Link>
        </div>

        <aside className="preview-card" aria-label="Example insight preview">
          <p className="preview-quote">&quot;You never listen.&quot;</p>
          <p className="preview-label">Possible feeling</p>
          <div className="preview-signals">
            <span className="signal-chip">Hurt</span>
            <span className="signal-chip">Defensive</span>
          </div>
          <p className="preview-label">Temperature: 68% rising</p>
        </aside>
      </section>

      <section className="section">
        <h2>Choose how you want to understand</h2>
        <p className="section-copy">
          Emotion Mirror supports three modes depending on whether the other person can join.
        </p>
        <div className="mode-grid">
          <article className="mode-card">
            <h3>Live Conversation</h3>
            <p>
              Both people participate. Talk naturally while AI provides real-time emotional insights.
            </p>
            <Link to="/live" className="btn btn-secondary">
              Start Live Conversation
            </Link>
          </article>
          <article className="mode-card">
            <h3>Private Mirror</h3>
            <p>
              Both participate, but each gets a private AI perspective that the other person cannot see.
            </p>
            <Link to="/private" className="btn btn-secondary">
              Create Private Room
            </Link>
          </article>
          <article className="mode-card">
            <h3>Solo Reflection</h3>
            <p>
              Only you participate. Paste, upload, or describe a conversation for emotional signals.
            </p>
            <Link to="/solo" className="btn btn-secondary">
              Analyze a Conversation
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
