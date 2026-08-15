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
import PrivateRoomLayout from './modes/private/PrivateRoomLayout.jsx';
import PrivateCreatePage from './modes/private/PrivateCreatePage.jsx';
import PrivateWaitingPage from './modes/private/PrivateWaitingPage.jsx';
import PrivateJoinPage from './modes/private/PrivateJoinPage.jsx';
import PrivateRoomPage from './modes/private/PrivateRoomPage.jsx';
import PrivateCompletePage from './modes/private/PrivateCompletePage.jsx';
import SoloChooseMethodPage from './modes/solo/SoloChooseMethodPage.jsx';
import SoloPastePage from './modes/solo/SoloPastePage.jsx';
import SoloUploadPage from './modes/solo/SoloUploadPage.jsx';
import SoloDescribePage from './modes/solo/SoloDescribePage.jsx';
import SoloResultsPage from './modes/solo/SoloResultsPage.jsx';

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
        <Route path="/private" element={<PrivateCreatePage />} />
        <Route path="/private/waiting/:code" element={<PrivateWaitingPage />} />
        <Route path="/private/join/:code" element={<PrivateJoinPage />} />
        <Route path="/private/complete/:code" element={<PrivateCompletePage />} />
        <Route path="/solo" element={<SoloChooseMethodPage />} />
        <Route path="/solo/paste" element={<SoloPastePage />} />
        <Route path="/solo/upload" element={<SoloUploadPage />} />
        <Route path="/solo/describe" element={<SoloDescribePage />} />
        <Route path="/solo/results/:sessionId" element={<SoloResultsPage />} />
      </Route>

      <Route element={<LiveRoomLayout />}>
        <Route path="/live/room/:code" element={<LiveRoomPage />} />
      </Route>

      <Route element={<PrivateRoomLayout />}>
        <Route path="/private/room/:code" element={<PrivateRoomPage />} />
      </Route>
    </Routes>
  );
}

export default App;
