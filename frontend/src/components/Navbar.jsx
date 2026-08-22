import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { theme } from '../theme.js';
// Navbar component with navigation links and user authentication options
const links = [
  { to: '/feed', label: 'Feed' },
  { to: '/clubs', label: 'Clubs' },
  { to: '/watched', label: 'Watched' },
];
// Navbar component with navigation links and user authentication options
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const linkStyle = (isActive) => ({
    color: isActive ? theme.color.amber : theme.color.textDim,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 14,
    padding: '8px 4px',
    borderBottom: isActive ? `2px solid ${theme.color.amber}` : '2px solid transparent',
  });

  return (
    <nav
      style={{
        background: theme.color.coalSoft,
        borderBottom: `1px solid ${theme.color.coalBorder}`,
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <Link
        to="/feed"
        style={{
          fontFamily: theme.font.heading,
          fontSize: 20,
          fontWeight: 700,
          color: theme.color.amber,
          textDecoration: 'none',
          letterSpacing: 0.5,
        }}
      >
        🎬 Reel Club
      </Link>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <div style={{ display: 'flex', gap: 18 }}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} style={({ isActive }) => linkStyle(isActive)}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {user ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                border: `1px solid ${theme.color.coalBorder}`,
                borderRadius: theme.radius.pill,
                padding: '4px 10px 4px 4px',
                cursor: 'pointer',
                color: theme.color.text,
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: `linear-gradient(180deg, ${theme.color.amberSoft}, ${theme.color.goldDeep})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#1a1204',
                }}
              >
                {(user.username || user.email || '?').charAt(0).toUpperCase()}
              </span>
              <span style={{ fontSize: 13 }}>{user.username || 'Account'}</span>
            </button>

            {menuOpen && (
              <div
                onMouseLeave={() => setMenuOpen(false)}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  background: theme.color.coalCard,
                  border: `1px solid ${theme.color.coalBorder}`,
                  borderRadius: theme.radius.sm,
                  boxShadow: theme.shadow.card,
                  minWidth: 160,
                  overflow: 'hidden',
                }}
              >
                <Link to="/profile" onClick={() => setMenuOpen(false)} style={dropdownItem}>
                  Profile
                </Link>
                <Link to="/profile/edit" onClick={() => setMenuOpen(false)} style={dropdownItem}>
                  Edit profile
                </Link>
                <button onClick={handleLogout} style={{ ...dropdownItem, width: '100%', textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/login" style={{ color: theme.color.textDim, textDecoration: 'none', fontSize: 14 }}>Log in</Link>
            <Link
              to="/signup"
              style={{
                color: '#1a1204',
                background: theme.color.amber,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: theme.radius.pill,
              }}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const dropdownItem = {
  display: 'block',
  padding: '10px 14px',
  fontSize: 13,
  color: '#f3ece0',
  textDecoration: 'none',
};

export default Navbar;