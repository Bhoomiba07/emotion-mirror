import { Link } from 'react-router-dom';
import ModeCard from '../components/ModeCard.jsx';

function HowItWorksPage() {
  return (
    <section className="section section--page">
      <div className="section__intro">
        <p className="eyebrow">How It Works</p>
        <h1>Understand emotional signals without claiming to read minds.</h1>
        <p className="section-copy">
          Emotion Mirror analyzes language, context, emotional intensity, and conversation patterns
          to present possible perspectives. It does not decide who is right, and it does not claim
          to know exactly what another person feels.
        </p>
      </div>

      <div className="step-row" aria-label="Basic flow">
        <article className="step-card">
          <p className="step-card__number">1</p>
          <h2>Choose a mode</h2>
          <p>Live, Private, or Solo — based on whether the other person can participate.</p>
        </article>
        <article className="step-card">
          <p className="step-card__number">2</p>
          <h2>Share the conversation</h2>
          <p>Talk together in real time, or paste, upload, or describe a conversation alone.</p>
        </article>
        <article className="step-card">
          <p className="step-card__number">3</p>
          <h2>See possible perspectives</h2>
          <p>
            Explore possible emotional signals, conversation temperature, turning points, and —
            only if you ask — optional communication suggestions.
          </p>
        </article>
      </div>

      <div className="section__intro section__intro--spaced">
        <h2>Three ways to use Emotion Mirror</h2>
        <p className="section-copy">
          The same core idea applies in every mode: show possible perspectives, not certainty.
        </p>
      </div>

      <div className="mode-grid">
        <ModeCard
          accent="live"
          eyebrow="Live Conversation"
          title="Both people participate"
          details={[
            'Talk naturally while AI provides real-time emotional insights.',
            'Best for couples, friends, family, and difficult discussions.',
          ]}
          ctaLabel="Start Live Conversation"
          ctaTo="/live"
        />
        <ModeCard
          accent="private"
          eyebrow="Private Mirror"
          title="Both participate, privately"
          details={[
            'Each person gets their own private AI perspective.',
            'Useful for sensitive conversations where both people want perspective without exposing private AI interpretations.',
          ]}
          ctaLabel="Create Private Room"
          ctaTo="/private"
        />
        <ModeCard
          accent="solo"
          eyebrow="Solo Reflection"
          title="Only you participate"
          details={[
            'Upload or describe the conversation.',
            'Useful when the other person does not want to participate, is unavailable, or does not want to use Emotion Mirror.',
          ]}
          ctaLabel="Analyze a Conversation"
          ctaTo="/solo"
        />
      </div>

      <div className="callout">
        <p>
          AI interpretations are estimates. A message may indicate frustration, withdrawal, or
          several other possibilities. When context is limited, Emotion Mirror should say that the
          available information may not be enough to determine someone&apos;s actual feelings.
        </p>
        <Link to="/choose" className="btn btn-primary">
          Start Understanding
        </Link>
      </div>
    </section>
  );
}

export default HowItWorksPage;
