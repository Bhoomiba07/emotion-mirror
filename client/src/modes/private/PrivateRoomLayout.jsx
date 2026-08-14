import { Outlet } from 'react-router-dom';
import './private.css';

function PrivateRoomLayout() {
  return (
    <div className="private-room-layout">
      <Outlet />
    </div>
  );
}

export default PrivateRoomLayout;
