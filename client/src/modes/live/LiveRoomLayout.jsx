import { Outlet } from 'react-router-dom';
import './live.css';

/**
 * Minimal shell for the Live Conversation room (no marketing nav).
 */
function LiveRoomLayout() {
  return (
    <div className="live-room-layout">
      <Outlet />
    </div>
  );
}

export default LiveRoomLayout;
