import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <section className="section section--page">
      <div className="section__intro">
        <p className="eyebrow">About</p>
        <h1>Show possible perspectives — not certainty.</h1>
        <p className="section-copy">
          Emotion Mirror is an AI-powered emotional understanding platform for difficult
          communication. It offers three modes — Live Conversation, Private Mirror, and Solo
          Reflection — so the product stays useful whether the other person joins or not.
        </p>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <h2>Core philosophy</h2>
          <p>Do not tell people what others feel.</p>
          <p>Instead: show possible perspectives.</p>
        </article>

        <article className="about-card">
          <h2>What the AI is saying</h2>
          <p>Not: “This is their emotion.”</p>
          <p>
            Instead: “Here are emotional signals that could explain what you&apos;re seeing.”
          </p>
        </article>

        <article className="about-card">
          <h2>What Emotion Mirror does not do</h2>
          <ul className="about-list">
            <li>It does not decide who is right.</li>
            <li>It does not claim to read minds.</li>
            <li>It does not diagnose people or relationships.</li>
            <li>It does not present interpretations as facts.</li>
          </ul>
        </article>

        <article className="about-card">
          <h2>Safer language</h2>
          <p>
            Prefer phrasing such as “This may indicate frustration,” or “This could reflect several
            possibilities,” or “The available context may not be sufficient to determine their
            actual feelings.”
          </p>
        </article>
      </div>

      <div className="callout">
        <p>
          AI interpretation equals a possible perspective — not certainty. That distinction is what
          makes Emotion Mirror credible.
        </p>
        <Link to="/choose" className="btn btn-primary">
          Start Understanding
        </Link>
      </div>
    </section>
  );
}

export default AboutPage;
