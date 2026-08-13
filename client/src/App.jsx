import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ChooseExperiencePage from './pages/ChooseExperiencePage.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LiveModePlaceholder from './modes/live/LiveModePlaceholder.jsx';
import PrivateModePlaceholder from './modes/private/PrivateModePlaceholder.jsx';
import SoloModePlaceholder from './modes/solo/SoloModePlaceholder.jsx';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/choose" element={<ChooseExperiencePage />} />
        <Route path="/live" element={<LiveModePlaceholder />} />
        <Route path="/private" element={<PrivateModePlaceholder />} />
        <Route path="/solo" element={<SoloModePlaceholder />} />
      </Route>
    </Routes>
  );
}

export default App;
