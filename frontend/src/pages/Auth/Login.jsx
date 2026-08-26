import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate('/');
    } catch {
      setError('Invalid email or password');
    }
  };

  return <section className="auth-shell"><aside className="auth-poster"><p className="eyebrow">The after-credits club</p><h1>Stories are better when they linger.</h1><p>Find the people who notice the details you do.</p></aside><form className="auth-form" onSubmit={submit}><p className="eyebrow">Welcome back</p><h2>Take your seat.</h2>{error && <p className="error-message">{error}</p>}<div className="form-stack"><label><span className="field-label">Username</span><input autoComplete="username" placeholder="Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} required /></label><label><span className="field-label">Password</span><input type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required /></label><Button type="submit" disabled={submitting}>{submitting ? 'Logging in…' : 'Continue'} <span>→</span></Button></div><p>No account? <Link to="/signup">Join the club</Link></p></form></section>;
}

export default Login;
