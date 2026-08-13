import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            ◌
          </span>
          <span>Emotion Mirror</span>
        </NavLink>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="nav-toggle__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}
          aria-label="Primary"
        >
          <NavLink to="/how-it-works" onClick={closeMenu}>
            How It Works
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/choose" className="btn btn-primary" onClick={closeMenu}>
            Get Started
          </NavLink>
        </nav>
      </header>

      <main className="page">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>
          Emotion Mirror presents possible emotional perspectives — not facts about what someone
          feels.
        </p>
      </footer>
    </div>
  );
}

export default AppLayout;
