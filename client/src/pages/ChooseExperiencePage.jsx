import { Link } from 'react-router-dom';

function ChooseExperiencePage() {
  return (
    <section className="section">
      <h1>How would you like to use Emotion Mirror?</h1>
      <p className="section-copy">
        Choose the mode that fits your situation. You do not need to force the other person to join.
      </p>
      <div className="mode-grid">
        <article className="mode-card">
          <h3>Live</h3>
          <p>Talk together in real time. Both participate.</p>
          <Link to="/live" className="btn btn-primary">
            Start
          </Link>
        </article>
        <article className="mode-card">
          <h3>Private</h3>
          <p>Talk together privately. Separate AI perspectives.</p>
          <Link to="/private" className="btn btn-primary">
            Create Room
          </Link>
        </article>
        <article className="mode-card">
          <h3>Solo</h3>
          <p>You only. Analyze a conversation on your own.</p>
          <Link to="/solo" className="btn btn-primary">
            Analyze
          </Link>
        </article>
      </div>
    </section>
  );
}

export default ChooseExperiencePage;
