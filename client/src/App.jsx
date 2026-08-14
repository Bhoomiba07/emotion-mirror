import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ChooseExperiencePage from './pages/ChooseExperiencePage.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LiveRoomLayout from './modes/live/LiveRoomLayout.jsx';
import LiveCreatePage from './modes/live/LiveCreatePage.jsx';
import LiveWaitingPage from './modes/live/LiveWaitingPage.jsx';
import LiveJoinPage from './modes/live/LiveJoinPage.jsx';
import LiveRoomPage from './modes/live/LiveRoomPage.jsx';
import LiveEndedPage from './modes/live/LiveEndedPage.jsx';
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
        <Route path="/live" element={<LiveCreatePage />} />
        <Route path="/live/waiting/:code" element={<LiveWaitingPage />} />
        <Route path="/live/join/:code" element={<LiveJoinPage />} />
        <Route path="/live/ended/:code" element={<LiveEndedPage />} />
        <Route path="/private" element={<PrivateModePlaceholder />} />
        <Route path="/solo" element={<SoloModePlaceholder />} />
      </Route>

      <Route element={<LiveRoomLayout />}>
        <Route path="/live/room/:code" element={<LiveRoomPage />} />
      </Route>
    </Routes>
  );
}

export default App;
