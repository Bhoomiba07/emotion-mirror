import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ShareReflectionPanel from './components/ShareReflectionPanel.jsx';
import SharedReflectionPanel from './components/SharedReflectionPanel.jsx';
import SuggestionPanel from './components/SuggestionPanel.jsx';
import { usePrivateSocket } from './hooks/usePrivateSocket.js';
import {
  getOrCreateParticipantId,
  getStoredParticipantName,
  getStoredParticipantRole,
} from '../../services/privateSocket.js';
import './private.css';

function PrivateCompletePage() {
  const { code } = useParams();
  const [shareStepDone, setShareStepDone] = useState(false);

  const participantId = useMemo(() => getOrCreateParticipantId(code), [code]);
  const role = getStoredParticipantRole(code);
  const name = getStoredParticipantName(code);

  const { connected, roomState, sharedReflections, shareReflection, error } = usePrivateSocket({
    code,
    participantId,
    name: name || 'Participant',
    role: role || 'guest',
    enabled: Boolean(code && name && role),
  });

  const hasShared =
    roomState?.participants?.find((p) => p.id === participantId)?.hasShared ?? false;

  async function handleShare(selection) {
    await shareReflection(selection);
    setShareStepDone(true);
  }

  function handleSkipShare() {
    setShareStepDone(true);
  }

  return (
    <section className="private-page">
      <div className="private-page__intro">
        <p className="eyebrow">Private Mirror</p>
        <h1>Conversation complete</h1>
        <p className="section-copy">
          Session {code?.toUpperCase()} has ended. You may optionally share selected information,
          then review the shared neutral reflection.
        </p>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="complete-steps">
        {!shareStepDone ? (
          <ShareReflectionPanel
            onShare={handleShare}
            onSkip={handleSkipShare}
            disabled={!connected || roomState?.status !== 'ended'}
            hasShared={hasShared}
          />
        ) : (
          <>
            <SharedReflectionPanel
              sharedReflections={sharedReflections}
              neutralReflection={roomState?.neutralReflection}
            />
            <SuggestionPanel />
          </>
        )}
      </div>

      <div className="hero-actions">
        <Link to="/private" className="btn btn-primary">
          Create New Private Room
        </Link>
        <Link to="/choose" className="btn btn-secondary">
          Choose Another Experience
        </Link>
      </div>
    </section>
  );
}

export default PrivateCompletePage;
