import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Clapperboard,
  Compass,
  House,
  LogOut,
  MessageSquareText,
  Settings,
  Sparkles,
  UserCircle2,
  Users,
  Film,
  Menu,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import theme from "../theme.js";

const links = [
  { to: '/', label: 'Home', icon: House },
  { to: '/feed', label: 'Feed', icon: MessageSquareText },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/clubs', label: 'Clubs', icon: Users },
  { to: '/watched', label: 'Watched', icon: Film },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const profilePath = user?.id ? `/profile/${user.id}` : "/login";

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="app-navbar">
      <div className="app-navbar__top">
        <button type="button" className="app-navbar__menu" aria-label="Toggle navigation">
          <Menu size={16} />
        </button>

        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: theme.color.amber,
            fontFamily: theme.font.heading,
            fontSize: 26,
            fontWeight: 700,
            fontStyle: "italic",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Clapperboard size={18} />
          CineClub
        </Link>
      </div>

      <nav className="app-navbar__nav" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
                padding: "11px 12px",
                borderRadius: theme.radius.sm,
                color: isActive ? theme.color.amber : theme.color.textDim,
                background: isActive ? "rgba(245, 185, 66, 0.10)" : "transparent",
                borderLeft: isActive ? `2px solid ${theme.color.amber}` : "2px solid transparent",
                fontSize: 14,
                fontWeight: isActive ? 700 : 500,
                transition: "all 0.2s ease",
              })}
            >
              <Icon size={16} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {user && (
        <Link
          to={profilePath}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: theme.color.textDim,
            padding: "10px 12px",
            borderTop: `1px solid ${theme.color.coalBorder}`,
            marginBottom: 10,
            paddingTop: 18,
          }}
        >
          {user.profile_image_url || user.profileImageUrl || user.avatar_url || user.avatarUrl || user.image_url || user.imageUrl ? (
            <img
              src={user.profile_image_url || user.profileImageUrl || user.avatar_url || user.avatarUrl || user.image_url || user.imageUrl}
              alt={`${user.username || 'User'} profile picture`}
              width={30}
              height={30}
              style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: '50%' }}
            />
          ) : (
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
          )}
          <span style={{ fontSize: 13, overflow: "hidden", textOverflow: "ellipsis" }}>
            @{user.username || "member"}
          </span>
        </Link>
      )}

      <div className="rail-links">
        <NavLink to="/settings">
          <span className="rail-links__icon"><Settings size={14} /></span>
          Settings
        </NavLink>
        <NavLink to="/help">
          <span className="rail-links__icon"><Sparkles size={14} /></span>
          Help
        </NavLink>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {user ? (
          <button
            type="button"
            onClick={signOut}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: theme.radius.sm,
              border: `1px solid ${theme.color.coalBorder}`,
              background: "transparent",
              color: theme.color.textDim,
              cursor: "pointer",
              fontSize: 13,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <LogOut size={14} />
            Sign out
          </button>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                textAlign: "center",
                color: theme.color.textDim,
                padding: "9px",
                fontSize: 13,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <UserCircle2 size={14} />
              Log in
            </Link>

            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                textAlign: "center",
                background: theme.color.amber,
                color: "#1a1204",
                padding: "11px",
                borderRadius: theme.radius.sm,
                fontWeight: 700,
                fontSize: 13,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Sparkles size={14} />
              Sign up
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
