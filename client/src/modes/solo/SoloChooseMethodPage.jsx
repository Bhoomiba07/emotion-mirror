import { Link } from 'react-router-dom';
import './solo.css';

function SoloChooseMethodPage() {
  return (
    <section className="solo-page">
      <div className="solo-page__intro">
        <p className="eyebrow">Solo Reflection</p>
        <h1>How would you like to provide input?</h1>
        <p className="section-copy">
          Choose the method that works best for your situation. You can reflect on a past
          conversation privately.
        </p>
      </div>

      <div className="solo-methods">
        <article className="solo-method-card">
          <h2>Paste Conversation</h2>
          <p>Copy and paste the text of a conversation you'd like to reflect on.</p>
          <Link to="/solo/paste" className="btn btn-primary">
            Paste Conversation
          </Link>
        </article>

        <article className="solo-method-card">
          <h2>Upload Screenshot</h2>
          <p>Upload a screenshot of a conversation (OCR analysis).</p>
          <Link to="/solo/upload" className="btn btn-primary">
            Upload Screenshot
          </Link>
        </article>

        <article className="solo-method-card">
          <h2>Describe What Happened</h2>
          <p>Describe the conversation in your own words.</p>
          <Link to="/solo/describe" className="btn btn-primary">
            Describe Situation
          </Link>
        </article>
      </div>
    </section>
  );
}

export default SoloChooseMethodPage;
