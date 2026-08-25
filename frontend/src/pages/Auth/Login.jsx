import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);
    setSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate('/', { replace: true });
    } catch (err) {
      const status = err.response?.status;
      setError(
        status === 401 ? 'Invalid username or password.'
          : status === 400 ? err.response?.data?.error || 'Please correct the form.'
            : !err.response ? 'Network error. Check your connection and try again.'
              : 'The service is unavailable. Please try again shortly.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return <section className="auth-shell"><aside className="auth-poster"><p className="eyebrow">The after-credits club</p><h1>Stories are better when they linger.</h1><p>Find the people who notice the details you do.</p></aside><form className="auth-form" onSubmit={submit}><p className="eyebrow">Welcome back</p><h2>Take your seat.</h2>{error && <p className="error-message">{error}</p>}<div className="form-stack"><label><span className="field-label">Username</span><input autoComplete="username" placeholder="Your screen name" value={username} onChange={(e) => setUsername(e.target.value)} required /></label><label><span className="field-label">Password</span><input type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required /></label><Button type="submit" disabled={submitting}>{submitting ? 'Logging in…' : 'Enter Reel Club'} <span>→</span></Button></div><p>No account? <Link to="/signup">Join the club</Link></p></form></section>;
}

export default Login;
