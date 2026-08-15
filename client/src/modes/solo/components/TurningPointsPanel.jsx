import '../solo-neon.css';

function TurningPointsPanel({ turningPoints }) {
  if (!turningPoints || turningPoints.length === 0) {
    return null;
  }

  return (
    <section className="solo-analysis-panel solo-neon" aria-label="Turning points">
      <div className="solo-panel__header">
        <h2>Turning Points</h2>
      </div>

      <p className="solo-neon__note">
        Important moments where the emotional direction may have shifted.
      </p>

      <div className="solo-turning-points">
        {turningPoints.map((point, index) => (
          <div key={index} className="solo-turning-point">
            <h3>{point.moment}</h3>
            <p>{point.shift}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TurningPointsPanel;
