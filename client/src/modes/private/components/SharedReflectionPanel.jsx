function SharedReflectionPanel({ sharedReflections, neutralReflection }) {
  return (
    <section className="complete-step" aria-label="Shared conversation reflection">
      <h2>Shared Conversation Reflection</h2>
      <p className="section-copy">
        Neutral reflection — not a judgment about who was right or wrong.
        {neutralReflection?.demo ? ' (Demo content)' : ''}
      </p>

      <div className="shared-reflection-box">
        <h3>Shared neutral reflection</h3>
        {neutralReflection?.paragraphs?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {sharedReflections.length > 0 ? (
        <div className="shared-reflection-box">
          <h3>What participants chose to share</h3>
          {sharedReflections.map((item) => (
            <article key={item.participantId} className="shared-by-participant">
              <p>
                <strong>{item.participantName}</strong> shared:
              </p>
              {item.shared?.emotionalSignals ? (
                <ul>
                  {item.shared.emotionalSignals.map((signal) => (
                    <li key={signal.label}>
                      {signal.emoji} {signal.label} ({signal.confidence}%)
                    </li>
                  ))}
                </ul>
              ) : null}
              {item.shared?.privateInterpretation ? (
                <p>&quot;{item.shared.privateInterpretation}&quot;</p>
              ) : null}
              {item.shared?.conversationSummary ? (
                <p>{item.shared.conversationSummary}</p>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <p className="section-copy">No participant has shared additional information yet.</p>
      )}
    </section>
  );
}

export default SharedReflectionPanel;
