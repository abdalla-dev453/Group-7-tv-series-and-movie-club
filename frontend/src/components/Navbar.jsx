import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Clapperboard,
  Compass,
  House,
  LogOut,
  Menu,
  MessageSquareText,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  Users,
  Film,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { isAdmin } from "./AdminRoute.jsx";

const links = [
  { to: "/", label: "Home", icon: House },
  { to: "/feed", label: "Feed", icon: MessageSquareText },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/clubs", label: "Clubs", icon: Users },
  { to: "/watched", label: "Watched", icon: Film },
  { to: "/admin-portal", label: "Admin", icon: ShieldCheck },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const visibleLinks = links.filter((link) => link.to !== "/admin-portal" || isAdmin(user));
  const profilePath = user?.id ? `/profile/${user.id}` : "/login";

  const closeMenu = () => setMobileOpen(false);
  const signOut = async () => {
    await logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <header className={`app-navbar${mobileOpen ? " app-navbar--open" : ""}${isAuthPage ? " app-navbar--auth" : ""}`}>
      <div className="app-navbar__inner">
        <Link to="/" className="app-navbar__brand" onClick={closeMenu}>
          <Clapperboard size={21} aria-hidden="true" />
          <span>CineClub</span>
        </Link>

        <button
          type="button"
          className="app-navbar__menu"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

        <nav id="primary-navigation" className="app-navbar__nav" aria-label="Main navigation">
          {visibleLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={closeMenu}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
          <NavLink to="/settings" onClick={closeMenu} className={({ isActive }) => `app-navbar__mobile-utility${isActive ? " active" : ""}`}>
            <Settings size={16} aria-hidden="true" /><span>Settings</span>
          </NavLink>
          <NavLink to="/help" onClick={closeMenu} className={({ isActive }) => `app-navbar__mobile-utility${isActive ? " active" : ""}`}>
            <Sparkles size={16} aria-hidden="true" /><span>Help</span>
          </NavLink>
        </nav>

        <div className="app-navbar__actions">
          <Link to="/settings" className="app-navbar__utility" aria-label="Settings" title="Settings"><Settings size={17} /></Link>
          <Link to="/help" className="app-navbar__utility" aria-label="Help" title="Help"><Sparkles size={17} /></Link>
          {user ? (
            <>
              <Link to={profilePath} className="app-navbar__profile">
                {user.profile_image_url || user.profileImageUrl || user.avatar_url || user.avatarUrl || user.image_url || user.imageUrl ? (
                  <img src={user.profile_image_url || user.profileImageUrl || user.avatar_url || user.avatarUrl || user.image_url || user.imageUrl} alt="" />
                ) : <span className="app-navbar__avatar">{(user.username || "U")[0].toUpperCase()}</span>}
                <span>@{user.username || "member"}</span>
              </Link>
              <button type="button" className="app-navbar__signout" onClick={signOut}><LogOut size={15} /><span>Sign out</span></button>
            </>
          ) : (
            <>
              <Link to="/login" className="app-navbar__login"><UserCircle2 size={16} /><span>Log in</span></Link>
              <Link to="/signup" className="app-navbar__signup"><Sparkles size={15} /><span>Sign up</span></Link>
            </>
          )}
        </div>

        <div className="app-navbar__mobile-actions">
          {user ? (
            <>
              <Link to={profilePath} className="app-navbar__profile" onClick={closeMenu}>
                {user.profile_image_url || user.profileImageUrl || user.avatar_url || user.avatarUrl || user.image_url || user.imageUrl ? <img src={user.profile_image_url || user.profileImageUrl || user.avatar_url || user.avatarUrl || user.image_url || user.imageUrl} alt="" /> : <span className="app-navbar__avatar">{(user.username || "U")[0].toUpperCase()}</span>}
                <span>@{user.username || "member"}</span>
              </Link>
              <button type="button" className="app-navbar__signout" onClick={signOut}><LogOut size={15} /><span>Sign out</span></button>
            </>
          ) : <><Link to="/login" onClick={closeMenu}>Log in</Link><Link to="/signup" className="app-navbar__signup" onClick={closeMenu}>Sign up</Link></>}
        </div>
      </div>
    </header>
  );
}
