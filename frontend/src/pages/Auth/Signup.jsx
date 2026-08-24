import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(form);
      navigate('/');
    } catch (err) {
      setError('Could not create account');
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, margin: '80px auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ color: 'var(--amber)' }}>Sign up</h2>
      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
      <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button type="submit">Create account</Button>
      <p style={{ fontSize: 13, color: 'var(--text-dim)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--amber)' }}>Log in</Link>
      </p>
    </form>
  );
}

export default Signup;
