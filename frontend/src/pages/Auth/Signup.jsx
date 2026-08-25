import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      await signup(form);
      navigate('/', { replace: true });
    } catch (err) {
      const status = err.response?.status;
      setError(
        status === 400 || status === 409 ? err.response?.data?.error || 'Please correct the form.'
          : !err.response ? 'Network error. Check your connection and try again.'
            : 'Could not create account. Please try again shortly.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return <section className="auth-shell"><aside className="auth-poster"><p className="eyebrow">Your invitation</p><h1>A better way to be a fan.</h1><p>Make space for the films, series, and conversations that matter.</p></aside><form className="auth-form" onSubmit={submit}><p className="eyebrow">New membership</p><h2>Join the picture.</h2>{error && <p className="error-message">{error}</p>}<div className="form-stack"><label><span className="field-label">Username</span><input autoComplete="username" placeholder="Choose a screen name" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required minLength="3" /></label><label><span className="field-label">Email</span><input type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label><label><span className="field-label">Password</span><input type="password" autoComplete="new-password" placeholder="At least 8 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength="8" /></label><Button type="submit" disabled={submitting}>{submitting ? 'Creating account…' : 'Get your ticket'} <span>→</span></Button></div><p>Already a member? <Link to="/login">Log in</Link></p></form></section>;
}

export default Signup;
