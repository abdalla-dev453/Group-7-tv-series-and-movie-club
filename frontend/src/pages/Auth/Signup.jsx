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
    } catch {
      setError('Could not create account');
    }
  };

  return (
    <form onSubmit={submit} className="auth-form">
      <p className="eyebrow">Find your people</p>
      <h2>Sign up</h2>
      {error && <p className="form-error" role="alert">{error}</p>}
      <label htmlFor="signup-username">Username</label>
      <input id="signup-username" placeholder="Your screen name" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
      <label htmlFor="signup-email">Email</label>
      <input id="signup-email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <label htmlFor="signup-password">Password</label>
      <input id="signup-password" type="password" placeholder="Choose a password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <Button type="submit">Create account</Button>
      <p className="form-footer">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
}

export default Signup;
