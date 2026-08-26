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
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Could not create account');
    }
  };

  return (
    <form onSubmit={submit} className="auth-form">
      <h2>Sign up</h2>
      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
      <input placeholder="Username" value={form.username} minLength={3} required onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="email" placeholder="Email" value={form.email} required onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password (8+ characters)" value={form.password} minLength={8} required onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button type="submit">Create account</Button>
      <p style={{ fontSize: 13 }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
}

export default Signup;
