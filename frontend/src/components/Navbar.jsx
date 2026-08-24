import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import theme from '../theme.js';

const links = [
  { to: '/', label: 'Feed' },
  { to: '/clubs', label: 'Clubs' },
  { to: '/watched', label: 'Watched' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setMenuOpen(false);
      setMobileOpen(false);
      navigate('/login');
    }
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setMobileOpen(false);
  };

  const profileId = user?.id || user?.user_id;

  const profilePath = profileId
    ? `/profile/${profileId}`
    : '/';

  const editProfilePath = profileId
    ? `/profile/${profileId}/edit`
    : '/';

  const linkStyle = (isActive) => ({
    color: isActive
      ? theme.color.amber
      : theme.color.textDim,

    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 14,
    padding: '8px 4px',

    borderBottom: isActive
      ? `2px solid ${theme.color.amber}`
      : '2px solid transparent',

    transition: 'color 0.2s ease, border-color 0.2s ease',
  });

  const mobileLinkStyle = ({ isActive }) => ({
    display: 'block',
    color: isActive
      ? theme.color.amber
      : theme.color.textDim,

    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 14,
    padding: '12px 4px',

    borderBottom: isActive
      ? `2px solid ${theme.color.amber}`
      : '2px solid transparent',
  });

  return (
    <nav
      style={{
        background: theme.color.coalSoft,
        borderBottom: `1px solid ${theme.color.coalBorder}`,
        padding: '14px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: theme.shadow.card,
      }}
    >
      {/* Main Navbar */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenus}
          style={{
            fontFamily: theme.font.heading,
            fontSize: 20,
            fontWeight: 700,
            color: theme.color.amber,
            textDecoration: 'none',
            letterSpacing: 0.5,
            whiteSpace: 'nowrap',
          }}
        >
          CineClub
        </Link>

        {/* Desktop Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
          className="desktop-navigation"
        >
          <div
            style={{
              display: 'flex',
              gap: 18,
            }}
          >
            {user && links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                style={({ isActive }) => linkStyle(isActive)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Authenticated User */}
          {user ? (
            <div
              style={{
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-label="Open account menu"
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
                {/* Avatar */}
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: `linear-gradient(
                      180deg,
                      ${theme.color.amberSoft},
                      ${theme.color.goldDeep}
                    )`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#1a1204',
                  }}
                >
                  {(user.username || user.email || '?')
                    .charAt(0)
                    .toUpperCase()}
                </span>

                <span
                  style={{
                    fontSize: 13,
                  }}
                >
                  {user.username || 'Account'}
                </span>

                <span
                  style={{
                    fontSize: 10,
                    opacity: 0.7,
                  }}
                >
                  ▼
                </span>
              </button>

              {/* Account Dropdown */}
              {menuOpen && (
                <div
                  onMouseLeave={() => setMenuOpen(false)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    background: theme.color.coalCard,
                    border: `1px solid ${theme.color.coalBorder}`,
                    borderRadius: theme.radius.sm,
                    boxShadow: theme.shadow.card,
                    minWidth: 180,
                    overflow: 'hidden',
                  }}
                >
                  <Link
                    to={profilePath}
                    onClick={closeMenus}
                    style={dropdownItem}
                  >
                    👤 Profile
                  </Link>

                  <Link
                    to={editProfilePath}
                    onClick={closeMenus}
                    style={dropdownItem}
                  >
                    ✏️ Edit profile
                  </Link>

                  <div
                    style={{
                      height: 1,
                      background: theme.color.coalBorder,
                      margin: '4px 0',
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      ...dropdownItem,
                      width: '100%',
                      textAlign: 'left',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    🚪 Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Guest Navigation */
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Link
                to="/login"
                style={{
                  color: theme.color.textDim,
                  textDecoration: 'none',
                  fontSize: 14,
                }}
              >
                Log in
              </Link>

              <Link
                to="/signup"
                style={{
                  color: '#1a1204',
                  background: theme.color.amber,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  padding: '7px 14px',
                  borderRadius: theme.radius.pill,
                }}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="mobile-menu-button"
          style={{
            display: 'none',
            background: 'transparent',
            border: `1px solid ${theme.color.coalBorder}`,
            color: theme.color.text,
            borderRadius: theme.radius.sm,
            padding: '7px 10px',
            cursor: 'pointer',
            fontSize: 18,
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          style={{
            maxWidth: 1200,
            margin: '12px auto 0',
            paddingTop: 12,
            borderTop: `1px solid ${theme.color.coalBorder}`,
          }}
          className="mobile-navigation"
        >
          {user && links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={closeMenus}
              style={mobileLinkStyle}
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <>
              <Link
                to={profilePath}
                onClick={closeMenus}
                style={mobileItem}
              >
                👤 Profile
              </Link>

              <Link
                to={editProfilePath}
                onClick={closeMenus}
                style={mobileItem}
              >
                ✏️ Edit profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  ...mobileItem,
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                🚪 Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenus}
                style={mobileItem}
              >
                Log in
              </Link>

              <Link
                to="/signup"
                onClick={closeMenus}
                style={{
                  ...mobileItem,
                  color: theme.color.amber,
                }}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
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

const mobileItem = {
  display: 'block',
  padding: '12px 4px',
  fontSize: 14,
  color: '#f3ece0',
  textDecoration: 'none',
};

export default Navbar;