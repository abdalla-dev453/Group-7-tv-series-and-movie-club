import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/feed', label: 'Feed' },
  { to: '/clubs', label: 'Clubs' },
  { to: '/watched', label: 'Watched' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const profilePath = user?.id
    ? `/profile/${user.id}`
    : '/';

  const signOut = async () => {
    await logout();
    setMobileOpen(false);
    navigate('/login');
  };

  return (
    <header className="site-nav">
      <div className="nav-inner">

        {/* Logo */}
        <Link
          className="brand"
          to="/"
          onClick={() => setMobileOpen(false)}
        >
          <span className="brand-mark">C</span>
          <em>CineClub</em>
        </Link>

        {/* Navigation */}
        <nav
          className={`nav-links ${mobileOpen ? 'is-open' : ''}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Account actions */}
        <div className="nav-actions">
          {user ? (
            <>
              <Link
                className="nav-account"
                to={profilePath}
                onClick={() => setMobileOpen(false)}
              >
                @{user.username || 'member'}
              </Link>

              <button
                className="nav-cta"
                type="button"
                onClick={signOut}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                className="nav-account"
                to="/login"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>

              <Link
                className="nav-cta"
                to="/signup"
                onClick={() => setMobileOpen(false)}
              >
                Join the club
              </Link>
            </>
          )}

          {/* Mobile menu */}
          <button
            className="nav-toggle"
            type="button"
            onClick={() =>
              setMobileOpen((open) => !open)
            }
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? '×' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}