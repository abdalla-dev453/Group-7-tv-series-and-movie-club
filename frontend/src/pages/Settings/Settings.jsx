import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Activity, MessageSquare, LogOut, ChevronRight, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileId = user?.id || user?.user_id;

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    {
      to: `/profile/${profileId}/edit`,
      icon: User,
      title: 'Account Management',
      desc: 'Update profile details and preferences',
    },
    {
      to: '/watched',
      icon: Activity,
      title: 'Activity & Content',
      desc: 'Review watched titles and history',
    },
    {
      to: '/feed',
      icon: MessageSquare,
      title: 'Community Activity',
      desc: 'Open feed and community discussions',
    },
  ];

  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <span style={styles.eyebrow}><Shield size={13} /> Account</span>
        <h1 style={styles.title}>Settings</h1>
        <p style={styles.intro}>Manage your account preferences and activity.</p>
      </div>

      <div style={styles.list}>
        {navItems.map(({ to, icon: Icon, title, desc }) => (
          <Link key={to} to={to} style={styles.row}>
            <div style={styles.iconBox}><Icon size={18} /></div>
            <div style={styles.textGroup}>
              <strong style={styles.rowTitle}>{title}</strong>
              <span style={styles.rowDesc}>{desc}</span>
            </div>
            <ChevronRight size={18} style={styles.chevron} />
          </Link>
        ))}

        {/* Danger Zone: Logout */}
        <div style={{ ...styles.row, ...styles.dangerRow }}>
          <div style={{ ...styles.iconBox, color: '#ef4444', background: 'rgba(239,68,68,0.1)' }}>
            <LogOut size={18} />
          </div>
          <div style={styles.textGroup}>
            <strong style={styles.rowTitle}>Session</strong>
            <span style={styles.rowDesc}>Sign out of your active session on this device</span>
          </div>
          <button type="button" onClick={handleSignOut} style={styles.logoutBtn}>
            Log out
          </button>
        </div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '3rem 1.5rem',
    color: '#f4f4f5',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  header: { marginBottom: '2rem' },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--accent, #e50914)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '0.5rem',
  },
  title: { fontSize: '2rem', fontWeight: '800', margin: '0 0 0.5rem 0' },
  intro: { color: '#a1a1aa', margin: 0, fontSize: '0.95rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.25rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    color: 'inherit',
    textDecoration: 'none',
    transition: 'background 0.2s, border-color 0.2s',
  },
  dangerRow: { borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.02)' },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.06)',
    color: '#e4e4e7',
    flexShrink: 0,
  },
  textGroup: { display: 'flex', flexDirection: 'column', flex: 1 },
  rowTitle: { fontSize: '0.95rem', fontWeight: '600', color: '#fff' },
  rowDesc: { fontSize: '0.825rem', color: '#71717a', marginTop: '0.15rem' },
  chevron: { color: '#52525b', flexShrink: 0 },
  logoutBtn: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '0.55rem 1rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.85rem',
    cursor: 'pointer',
    flexShrink: 0,
  },
};

export default Settings;