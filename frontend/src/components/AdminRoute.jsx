import { useAuth } from '../context/AuthContext.jsx';
import Loader from './common/Loader.jsx';
import AdminLoginForm from './AdminLoginForm.jsx';
import theme from '../theme.js';

export const isAdmin = (user) => {
  if (!user) return false;
  return Boolean(user.is_superuser || user.isSuperuser || user.role === 'admin' || user.role === 'superuser');
};

const AdminRoute = ({ children }) => {
  const { user, loading, logout } = useAuth();

  if (loading) return <Loader />;

  // Not logged in → show the admin login form right here
  if (!user) {
    return <AdminLoginForm />;
  }

  // Logged in but not an admin → Access Denied
  if (!isAdmin(user)) {
    return (
      <main className="page-panel" role="alert" style={{ maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            width: 56,
            height: 56,
            margin: '0 auto 12px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#f87171',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 800,
          }}
        >
          ⛔
        </div>
        <h1 style={{ fontFamily: theme.font.heading, fontSize: 24, margin: '0 0 8px' }}>
          Access Denied
        </h1>
        <p style={{ color: theme.color.textDim, fontSize: 14, margin: '0 0 20px' }}>
          You are signed in as <strong style={{ color: theme.color.text }}>@{user.username || 'member'}</strong>, but this
          account does not have administrator privileges.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <a
            href="/"
            style={{
              padding: '10px 18px',
              borderRadius: theme.radius.sm,
              border: `1px solid ${theme.color.coalBorder}`,
              color: theme.color.text,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Return to Home
          </a>
          <button
            type="button"
            onClick={logout}
            style={{
              padding: '10px 18px',
              borderRadius: theme.radius.sm,
              border: 'none',
              background: theme.color.amber,
              color: '#1a1204',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Sign out & login as admin
          </button>
        </div>
      </main>
    );
  }

  return children;
};

export default AdminRoute;
