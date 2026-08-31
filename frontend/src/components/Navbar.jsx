import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import theme from '../theme.js';

const links = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/feed', label: 'Feed', icon: '+' },
  { to: '/discover', label: 'Discover', icon: '⌕' },
  { to: '/clubs', label: 'Clubs', icon: '♟' },
  { to: '/watched', label: 'Watched', icon: '▣' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const profilePath = user?.id
    ? `/profile/${user.id}`
    : '/login';

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 220,
        background: theme.color.coal,
        borderRight: `1px solid ${theme.color.coalBorder}`,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        boxSizing: 'border-box',
        padding: '24px 16px',
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          color: theme.color.amber,
          fontFamily: theme.font.heading,
          fontSize: 22,
          fontWeight: 800,
          padding: '0 10px',
          marginBottom: 40,
        }}
      >
        CineClub
      </Link>

      {/* NAVIGATION */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              textDecoration: 'none',
              padding: '11px 12px',
              borderRadius: theme.radius.sm,

              color: isActive
                ? theme.color.amber
                : theme.color.textDim,

              background: isActive
                ? 'rgba(245, 185, 66, 0.10)'
                : 'transparent',

              borderLeft: isActive
                ? `2px solid ${theme.color.amber}`
                : '2px solid transparent',

              fontSize: 14,
              fontWeight: isActive ? 700 : 500,
              transition: 'all 0.2s ease',
            })}
          >
            <span
              style={{
                width: 18,
                textAlign: 'center',
                fontSize: 15,
              }}
            >
              {link.icon}
            </span>

            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* SPACER */}
      <div style={{ flex: 1 }} />

      {/* USER */}
      {user && (
        <Link
          to={profilePath}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            color: theme.color.textDim,
            padding: '10px 12px',
            borderTop: `1px solid ${theme.color.coalBorder}`,
            marginBottom: 10,
            paddingTop: 18,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: theme.color.amber,
              color: '#1a1204',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            {(user.username || 'U')[0].toUpperCase()}
          </div>

          <span
            style={{
              fontSize: 13,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            @{user.username || 'member'}
          </span>
        </Link>
      )}

      <div className="rail-links">
        <NavLink to="/settings">⚙ Settings</NavLink>
        <NavLink to="/help">? Help</NavLink>
      </div>

      {/* ACCOUNT ACTIONS */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {user ? (
          <button
            type="button"
            onClick={signOut}
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: theme.radius.sm,
              border: `1px solid ${theme.color.coalBorder}`,
              background: 'transparent',
              color: theme.color.textDim,
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Sign out
          </button>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                textDecoration: 'none',
                textAlign: 'center',
                color: theme.color.textDim,
                padding: '9px',
                fontSize: 13,
              }}
            >
              Log in
            </Link>

            <Link
              to="/signup"
              style={{
                textDecoration: 'none',
                textAlign: 'center',
                background: theme.color.amber,
                color: '#1a1204',
                padding: '11px',
                borderRadius: theme.radius.sm,
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}