/**
 * Static demo insight only — not connected to AI.
 * Matches the PDF landing example ("You never listen.").
 */
function InsightPreview() {
  return (
    <aside className="insight-preview" aria-label="Example insight preview">
      <p className="insight-preview__badge">Example only</p>
      <p className="insight-preview__quote">&quot;You never listen.&quot;</p>

      <div className="insight-preview__block">
        <p className="insight-preview__label">Possible feeling</p>
        <div className="insight-preview__signals" role="list">
          <span className="signal-chip" role="listitem">
            Hurt
          </span>
          <span className="signal-chip" role="listitem">
            Defensive
          </span>
        </div>
      </div>

      <div className="insight-preview__block">
        <div className="insight-preview__temp-header">
          <p className="insight-preview__label">Conversation temperature</p>
          <p className="insight-preview__temp-value">
            68% <span aria-hidden="true">↑</span>
            <span className="visually-hidden">rising</span>
          </p>
        </div>
        <div
          className="temperature-meter"
          role="img"
          aria-label="Example conversation temperature at 68 percent, rising"
        >
          <div className="temperature-meter__fill" style={{ width: '68%' }} />
        </div>
        <p className="insight-preview__note">
          Demo values only. Emotion Mirror shows possible perspectives — not facts about what someone
          feels.
        </p>
      </div>
    </aside>
  );
}

export default InsightPreview;
