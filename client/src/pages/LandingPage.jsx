import { Link } from 'react-router-dom';
import InsightPreview from '../components/InsightPreview.jsx';
import ModeCard from '../components/ModeCard.jsx';

function LandingPage() {
  return (
    <>
      <section className="hero hero--split">
        <div className="hero__copy">
          <p className="eyebrow">Emotion Mirror</p>
          <h1>Understand what words don&apos;t say.</h1>
          <p className="hero-lead">
            AI-powered emotional understanding for difficult conversations.
          </p>
          <p className="hero-support">
            Understand their perspective without assuming you know exactly what they feel. Emotion
            Mirror helps surface possible emotional signals in communication — estimates, not mind
            reading.
          </p>
          <div className="hero-actions">
            <Link to="/choose" className="btn btn-primary">
              Start Understanding
            </Link>
            <Link to="/how-it-works" className="btn btn-secondary">
              See How It Works
            </Link>
          </div>
        </div>

        <InsightPreview />
      </section>

      <section className="section">
        <div className="section__intro">
          <h2>Choose how you want to understand</h2>
          <p className="section-copy">
            There are three ways to use Emotion Mirror, depending on whether the other person wants
            to participate.
          </p>
        </div>

        <div className="mode-grid">
          <ModeCard
            accent="live"
            eyebrow="Live"
            title="Live Conversation"
            details={[
              'Both people participate.',
              'Talk naturally while AI provides real-time emotional insights.',
            ]}
            bestFor="couples, friends, family, difficult discussions"
            ctaLabel="Start Live Conversation"
            ctaTo="/live"
          />
          <ModeCard
            accent="private"
            eyebrow="Private"
            title="Private Mirror"
            details={[
              'Both people participate, but each gets their own private AI perspective.',
              'You both communicate while Emotion Mirror privately shows what the other person may be experiencing.',
            ]}
            bestFor="sensitive conversations where both people want perspective without exposing private AI interpretations"
            ctaLabel="Create Private Room"
            ctaTo="/private"
          />
          <ModeCard
            accent="solo"
            eyebrow="Solo"
            title="Solo Reflection"
            details={[
              'Only you participate.',
              'Upload or describe the conversation and explore possible emotional signals from the other person\'s communication.',
            ]}
            bestFor="when the other person does not want to talk, is not available, or does not want to use Emotion Mirror"
            ctaLabel="Analyze a Conversation"
            ctaTo="/solo"
          />
        </div>
      </section>
    </>
  );
}

export default LandingPage;
