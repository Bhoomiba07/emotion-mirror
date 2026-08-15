import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSoloResults } from '../../api/solo.js';
import EmotionalSignalsPanel from './components/EmotionalSignalsPanel.jsx';
import InterpretationPanel from './components/InterpretationPanel.jsx';
import UserSignalsPanel from './components/UserSignalsPanel.jsx';
import TemperaturePanel from './components/TemperaturePanel.jsx';
import TurningPointsPanel from './components/TurningPointsPanel.jsx';
import ReflectionPanel from './components/ReflectionPanel.jsx';
import SuggestionPanel from './components/SuggestionPanel.jsx';
import './solo.css';
import './solo-neon.css';

function SoloResultsPage() {
  const { sessionId } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadResults() {
      try {
        const data = await getSoloResults(sessionId);
        setResults(data);
      } catch (err) {
        setError(err.message || 'Unable to load results.');
      } finally {
        setLoading(false);
      }
    }

    if (sessionId) {
      loadResults();
    }
  }, [sessionId]);

  if (loading) {
    return (
      <section className="solo-page">
        <div className="solo-page__intro">
          <p className="eyebrow">Solo Reflection</p>
          <h1>Loading analysis...</h1>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="solo-page">
        <div className="solo-page__intro">
          <p className="eyebrow">Solo Reflection</p>
          <h1>Analysis not found</h1>
          <p className="section-copy">{error}</p>
        </div>
        <Link to="/solo" className="btn btn-primary">
          Start New Reflection
        </Link>
      </section>
    );
  }

  const analysis = results?.analysisResults;

  return (
    <section className="solo-results-page">
      <div className="solo-results__intro">
        <p className="eyebrow">Solo Reflection</p>
        <h1>Your Reflection Analysis</h1>
        <p className="section-copy">
          This analysis is private to you and based on {results?.inputMethod === 'paste' ? 'pasted conversation text' : results?.inputMethod === 'describe' ? 'your description' : 'your input'}.
        </p>
      </div>

      <div className="solo-results__panels">
        <EmotionalSignalsPanel signals={analysis?.emotionalSignals} />
        <InterpretationPanel interpretation={analysis?.interpretation} />
        <UserSignalsPanel signals={analysis?.userSignals} />
        <TemperaturePanel temperature={analysis?.temperature} />
        <TurningPointsPanel turningPoints={analysis?.turningPoints} />
        <ReflectionPanel reflection={analysis?.reflection} />
        <SuggestionPanel />
      </div>

      <div className="solo-results__actions">
        <Link to="/solo" className="btn btn-primary">
          New Solo Reflection
        </Link>
        <Link to="/choose" className="btn btn-secondary">
          Choose Another Experience
        </Link>
      </div>
    </section>
  );
}

export default SoloResultsPage;
