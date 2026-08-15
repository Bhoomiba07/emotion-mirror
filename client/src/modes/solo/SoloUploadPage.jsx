import { useNavigate } from 'react-router-dom';
import './solo.css';

function SoloUploadPage() {
  const navigate = useNavigate();

  return (
    <section className="solo-page">
      <div className="solo-page__intro">
        <p className="eyebrow">Solo Reflection</p>
        <h1>Upload Screenshot</h1>
        <p className="section-copy">
          Upload a screenshot of a conversation for OCR analysis and reflection.
        </p>
      </div>

      <div className="solo-placeholder-box">
        <div className="solo-placeholder-icon" aria-hidden="true">
          📷
        </div>
        <h2>OCR Not Yet Implemented</h2>
        <p>
          Screenshot upload and OCR text extraction are planned features but not currently
          available.
        </p>
        <p>
          For now, please use one of the other input methods to analyze your conversation.
        </p>
        <div className="solo-placeholder-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/solo/paste')}
          >
            Paste Conversation Instead
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/solo/describe')}
          >
            Describe Instead
          </button>
        </div>
      </div>

      <div className="solo-form-actions">
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/solo')}>
          Back to Input Methods
        </button>
      </div>
    </section>
  );
}

export default SoloUploadPage;
