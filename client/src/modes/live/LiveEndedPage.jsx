import { Link, useParams } from 'react-router-dom';
import './live.css';

function LiveEndedPage() {
  const { code } = useParams();

  return (
    <section className="live-page">
      <div className="live-card live-card--center">
        <p className="eyebrow">Live Conversation</p>
        <h1>Conversation ended</h1>
        <p className="section-copy">
          The live session {code ? `(${code.toUpperCase()})` : ''} has ended. Reflection and AI
          analysis features will be added in a later phase.
        </p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link to="/live" className="btn btn-primary">
            Start New Live Conversation
          </Link>
          <Link to="/choose" className="btn btn-secondary">
            Choose Another Experience
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LiveEndedPage;
