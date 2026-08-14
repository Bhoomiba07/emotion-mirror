import './private-neon.css';

/**
 * Private AI panel — neon theme only for this AI-related interface.
 * Data arrives only via private:mirror socket event (never from shared room state).
 */
function PrivateMirrorPanel({ mirror }) {
  if (!mirror) {
    return (
      <aside
        className="private-panel private-mirror-neon"
        aria-label="Private mirror loading"
      >
        <div className="private-panel__header">
          <h2>Private Mirror</h2>
        </div>
        <p className="private-mirror-neon__note">Loading your private perspective...</p>
      </aside>
    );
  }

  return (
    <aside className="private-panel private-mirror-neon" aria-label="Private mirror">
      <div className="private-panel__header">
        <h2>Private Mirror</h2>
        <span className="private-mirror-neon__badge">Demo only</span>
      </div>

      <p className="private-mirror-neon__private-label">Private to you</p>

      <p className="private-mirror-neon__signal-label">{mirror.title}</p>

      <div className="private-mirror-neon__signals">
        {mirror.signals?.map((signal) => (
          <div key={signal.label} className="private-mirror-neon__signal">
            <span className="private-mirror-neon__signal-icon" aria-hidden="true">
              {signal.emoji}
            </span>
            <div>
              <p className="private-mirror-neon__signal-label">
                {signal.label} — {signal.confidence}%
              </p>
              <p className="private-mirror-neon__signal-confidence">Possible signal</p>
            </div>
          </div>
        ))}
      </div>

      <blockquote className="private-mirror-neon__interpretation">
        &quot;{mirror.interpretation}&quot;
      </blockquote>

      <p className="private-mirror-neon__disclaimer">AI interpretation — not a fact</p>
      <p className="private-mirror-neon__note">
        Static demo values. Only you receive this panel — the other participant cannot see it.
      </p>
    </aside>
  );
}

export default PrivateMirrorPanel;
