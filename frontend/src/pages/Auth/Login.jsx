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

  return (
    <form onSubmit={submit} className="auth-form">
      <h2>Log in</h2>
      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit">Log in</Button>
      <p style={{ fontSize: 13 }}>
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
}

export default Login;
