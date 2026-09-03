import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import theme from '../theme.js';

const AdminLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();

  const submit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setError(null);
    setSubmitting(true);

    try {
      await login(username.trim(), password);
      // On success, AdminRoute will re-render and either show the portal
      // (if the account is an admin) or the Access Denied message..
    } catch (err) {
      console.error('Admin login error:', err);

      const status = err.response?.status;

      if (status === 401 || status === 400) {
        setError('Invalid admin username or password.');
      } else if (!err.response) {
        setError('Unable to connect to the server. Please check your connection.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-panel" style={{ maxWidth: 420, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div
          style={{
            width: 56,
            height: 56,
            margin: '0 auto 12px',
            borderRadius: '50%',
            background: theme.color.amber,
            color: '#1a1204',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 800,
          }}
        >
          ⚙
        </div>
        <h1 style={{ fontFamily: theme.font.heading, fontSize: 24, margin: '0 0 6px' }}>
          Admin Portal
        </h1>
        <p style={{ color: theme.color.textDim, fontSize: 13, margin: 0 }}>
          Sign in with an administrator account to continue..
        </p>
      </div>

      {error && (
        <p
          className="error-message"
          role="alert"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '10px 14px',
            borderRadius: theme.radius.sm,
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          {error}
        </p>
      )}

      <form onSubmit={submit} className="form-stack">
        <label>
          <span className="field-label">Admin Username</span>
          <input
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Enter admin username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          <span className="field-label">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: theme.radius.sm,
            border: 'none',
            background: theme.color.amber,
            color: '#1a1204',
            fontWeight: 700,
            fontSize: 14,
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.6 : 1,
            marginTop: 4,
          }}
        >
          {submitting ? 'Signing in…' : 'Login as Admin'}
        </button>
      </form>

      <p style={{ textAlign: 'center', color: theme.color.textDim, fontSize: 13, marginTop: 18 }}>
        Not an admin?{' '}
        <Link to="/login" style={{ color: theme.color.amber }}>
          Log in as a member
        </Link>
      </p>
    </main>
  );
};

export default AdminLoginForm;