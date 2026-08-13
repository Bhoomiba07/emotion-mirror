import { NavLink, Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            ◌
          </span>
          <span>Emotion Mirror</span>
        </NavLink>
        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/how-it-works">How It Works</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/choose" className="btn btn-primary">
            Get Started
          </NavLink>
        </nav>
      </header>

      <main className="page">
        <Outlet />
      </main>

      <footer className="site-footer">
        Emotion Mirror presents possible emotional perspectives — not facts about what someone feels.
      </footer>
    </div>
  );
}

export default AppLayout;
