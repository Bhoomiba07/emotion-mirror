/**
 * AI mirror panel for Live Conversation UI (Phase 6 AI-enabled).
 * Displays real-time emotional insights from AI analysis or demo data.
 */
function YourMirrorPanel({ liveMirror }) {
  // If no mirror data yet, show loading state
  if (!liveMirror) {
    return (
      <aside className="live-panel live-panel--mirror" aria-label="Your mirror">
        <div className="live-panel__header">
          <h2>Your Mirror</h2>
          <span className="live-badge live-badge--loading">Loading...</span>
        </div>
        <p className="mirror-note">Waiting for conversation data...</p>
      </aside>
    );
  }

  const { signals = [], interpretation = '', temperature, demo = false } = liveMirror;

  return (
    <aside className="live-panel live-panel--mirror" aria-label="Your mirror">
      <div className="live-panel__header">
        <h2>Your Mirror</h2>
        {demo && <span className="live-badge live-badge--demo">Demo data</span>}
        {!demo && <span className="live-badge live-badge--ai">AI analysis</span>}
      </div>

      {signals.length > 0 && (
        <div className="mirror-signals">
          {signals.map((signal, index) => (
            <div key={index} className="mirror-signal">
              <span className="mirror-signal__icon" aria-hidden="true">
                {signal.emoji}
              </span>
              <div>
                <p className="mirror-signal__label">{signal.label}</p>
                <p className="mirror-signal__confidence">{signal.confidence}% confidence</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {interpretation && (
        <blockquote className="mirror-interpretation">
          &quot;{interpretation}&quot;
        </blockquote>
      )}

      {temperature && (
        <div className="mirror-temperature">
          <p className="mirror-temperature__label">Temperature: {temperature.label}</p>
          <p className="mirror-temperature__value">{temperature.current}/100</p>
          {temperature.trend && (
            <p className="mirror-temperature__trend">Trend: {temperature.trend}</p>
          )}
        </div>
      )}

      <p className="mirror-disclaimer">AI interpretation — not a fact</p>
      {!demo && (
        <p className="mirror-note">
          AI analyzes possible emotional signals from conversation context.
        </p>
      )}
      {demo && (
        <p className="mirror-note">
          Demo values shown. Configure GEMINI_API_KEY for real AI analysis.
        </p>
      )}
    </aside>
  );
}

export default YourMirrorPanel;
