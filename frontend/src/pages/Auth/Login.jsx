import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={submit} className="auth-form">
      <p className="eyebrow">Welcome back</p>
      <h2>Log in</h2>
      {error && <p className="form-error" role="alert">{error}</p>}
      <label htmlFor="login-email">Email</label>
      <input id="login-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label htmlFor="login-password">Password</label>
      <input id="login-password" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit">Log in</Button>
      <p className="form-footer">
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
}

export default Login;
