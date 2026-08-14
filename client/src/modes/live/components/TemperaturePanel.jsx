/**
 * Demo-only temperature panel for Live Conversation UI.
 * Real temperature engine will replace this in a future phase.
 */
function TemperaturePanel() {
  const demoValue = 72;
  const states = [
    { label: 'Cool', active: false },
    { label: 'Neutral', active: false },
    { label: 'Rising', active: true },
    { label: 'Heated', active: false },
  ];

  return (
    <aside className="live-panel live-panel--temperature" aria-label="Conversation temperature">
      <div className="live-panel__header">
        <h2>Conversation Temperature</h2>
        <span className="live-badge live-badge--demo">Demo only</span>
      </div>

      <div className="temperature-display">
        <p className="temperature-display__value">{demoValue}%</p>
        <p className="temperature-display__status">
          RISING <span aria-hidden="true">↑</span>
        </p>
      </div>

      <div
        className="temperature-meter temperature-meter--large"
        role="img"
        aria-label={`Demo conversation temperature at ${demoValue} percent, rising`}
      >
        <div className="temperature-meter__fill" style={{ width: `${demoValue}%` }} />
      </div>

      <ul className="temperature-states">
        {states.map((state) => (
          <li
            key={state.label}
            className={`temperature-states__item ${state.active ? 'temperature-states__item--active' : ''}`}
          >
            {state.label}
          </li>
        ))}
      </ul>

      <p className="mirror-note">
        Static demo temperature. Future phases will connect the temperature engine to conversation
        context.
      </p>
    </aside>
  );
}

export default TemperaturePanel;
