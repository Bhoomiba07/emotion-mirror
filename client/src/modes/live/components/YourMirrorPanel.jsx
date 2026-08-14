/**
 * Demo-only mirror panel for Live Conversation UI.
 * Real AI analysis will replace this in a future phase.
 * Future AI chat/panel UI should use a dedicated neon theme (see live-ai-neon.css when added).
 */
function YourMirrorPanel() {
  return (
    <aside className="live-panel live-panel--mirror" aria-label="Your mirror">
      <div className="live-panel__header">
        <h2>Your Mirror</h2>
        <span className="live-badge live-badge--demo">Demo only</span>
      </div>

      <div className="mirror-signals">
        <div className="mirror-signal">
          <span className="mirror-signal__icon" aria-hidden="true">
            😔
          </span>
          <div>
            <p className="mirror-signal__label">Hurt</p>
            <p className="mirror-signal__confidence">76% confidence</p>
          </div>
        </div>
        <div className="mirror-signal">
          <span className="mirror-signal__icon" aria-hidden="true">
            🛡
          </span>
          <div>
            <p className="mirror-signal__label">Defensive</p>
            <p className="mirror-signal__confidence">51% confidence</p>
          </div>
        </div>
      </div>

      <blockquote className="mirror-interpretation">
        &quot;They may feel unheard.&quot;
      </blockquote>

      <p className="mirror-disclaimer">AI interpretation — not a fact</p>
      <p className="mirror-note">
        Static demo values. Future AI will analyze possible emotional signals from conversation
        context.
      </p>
    </aside>
  );
}

export default YourMirrorPanel;
