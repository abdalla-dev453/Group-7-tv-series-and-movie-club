import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const links = [{ to: '/', label: 'Feed' }, { to: '/clubs', label: 'Clubs' }, { to: '/watched', label: 'Watched' }];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const profilePath = user?.id ? `/profile/${user.id}` : '/';

  const signOut = async () => {
    await logout();
    setMobileOpen(false);
    navigate('/login');
  };

  return <header className="site-nav"><div className="nav-inner">
    <Link className="brand" to="/" onClick={() => setMobileOpen(false)}><span className="brand-mark">R</span>REEL<em>CLUB</em></Link>
    <nav className={`nav-links ${mobileOpen ? 'is-open' : ''}`} aria-label="Main navigation">
      {links.map((link) => <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setMobileOpen(false)}>{link.label}</NavLink>)}
    </nav>
    <div className="nav-actions">
      {user ? <><Link className="nav-account" to={profilePath}>@{user.username || 'member'}</Link><button className="nav-cta" type="button" onClick={signOut}>Sign out</button></> : <><Link className="nav-account" to="/login">Log in</Link><Link className="nav-cta" to="/signup">Join the club</Link></>}
      <button className="nav-toggle" type="button" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={mobileOpen}>{mobileOpen ? '×' : '☰'}</button>
    </div>
  </div></header>;
}
