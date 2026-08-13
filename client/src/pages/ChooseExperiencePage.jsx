import ModeCard from '../components/ModeCard.jsx';

function ChooseExperiencePage() {
  return (
    <section className="section section--page">
      <div className="section__intro section__intro--center">
        <p className="eyebrow">Choose Your Experience</p>
        <h1>How would you like to use Emotion Mirror?</h1>
        <p className="section-copy">
          Pick the mode that fits your situation. You do not need to force the other person to join
          — choose Live, Private, or Solo based on what is possible right now.
        </p>
      </div>

      <div className="mode-grid mode-grid--choose">
        <ModeCard
          accent="live"
          eyebrow="Live"
          title="Live Conversation"
          description="Talk together in real time."
          participation="Both participate."
          ctaLabel="Start"
          ctaTo="/live"
          ctaVariant="primary"
        />
        <ModeCard
          accent="private"
          eyebrow="Private"
          title="Private Mirror"
          description="Talk together privately."
          participation="Both participate."
          ctaLabel="Create Room"
          ctaTo="/private"
          ctaVariant="primary"
        />
        <ModeCard
          accent="solo"
          eyebrow="Solo"
          title="Solo Reflection"
          description="You only."
          participation="One person."
          ctaLabel="Analyze"
          ctaTo="/solo"
          ctaVariant="primary"
        />
      </div>
    </section>
  );
}

export default ChooseExperiencePage;
