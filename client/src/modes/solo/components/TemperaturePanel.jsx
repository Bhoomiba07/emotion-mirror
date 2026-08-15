import '../solo-neon.css';

function TemperaturePanel({ temperature }) {
  if (!temperature) {
    return null;
  }

  const { start, middle, end } = temperature;
  const maxValue = 100;
  const startPercent = (start.value / maxValue) * 100;
  const middlePercent = (middle.value / maxValue) * 100;
  const endPercent = (end.value / maxValue) * 100;

  return (
    <section className="solo-analysis-panel solo-neon" aria-label="Conversation temperature">
      <div className="solo-panel__header">
        <h2>Conversation Temperature</h2>
      </div>

      <p className="solo-neon__note">
        The emotional trajectory of the conversation from start to end.
      </p>

      <div className="solo-temperature-stages">
        <div className="solo-temperature-stage">
          <p className="solo-temperature-stage__label">Start</p>
          <div className="solo-temperature-stage__bar">
            <div
              className="solo-temperature-stage__fill"
              style={{ width: `${startPercent}%` }}
            />
          </div>
          <p className="solo-temperature-stage__value">
            {start.label} ({start.value})
          </p>
        </div>

        <div className="solo-temperature-stage">
          <p className="solo-temperature-stage__label">Middle</p>
          <div className="solo-temperature-stage__bar">
            <div
              className="solo-temperature-stage__fill"
              style={{ width: `${middlePercent}%` }}
            />
          </div>
          <p className="solo-temperature-stage__value">
            {middle.label} ({middle.value})
          </p>
        </div>

        <div className="solo-temperature-stage">
          <p className="solo-temperature-stage__label">End</p>
          <div className="solo-temperature-stage__bar">
            <div
              className="solo-temperature-stage__fill"
              style={{ width: `${endPercent}%` }}
            />
          </div>
          <p className="solo-temperature-stage__value">
            {end.label} ({end.value})
          </p>
        </div>
      </div>
    </section>
  );
}

export default TemperaturePanel;
