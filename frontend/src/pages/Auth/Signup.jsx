import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';

function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setError(null);

    // Check password confirmation before sending anything
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);

    try {
      // Do NOT send confirmPassword to the backend
      const signupData = {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      };

      await signup(signupData);

      navigate('/', { replace: true });
    } catch (err) {
      const status = err.response?.status;

      setError(
        status === 400 || status === 409
          ? err.response?.data?.error ||
              'Please check your information and try again.'
          : !err.response
            ? 'Network error. Check your connection and try again.'
            : 'Could not create account. Please try again shortly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-shell">
      {/* Left side */}
      <aside className="auth-poster">
        <p className="eyebrow">Your invitation</p>

        <h1>A better way to be a fan.</h1>

        <p>
          Make space for the films, series, and conversations
          that matter.
        </p>
      </aside>

      {/* Signup form */}
      <form className="auth-form" onSubmit={submit}>
        <p className="eyebrow">New membership</p>

        <h2>Join the picture.</h2>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <div className="form-stack">
          {/* Username */}
          <label>
            <span className="field-label">Username</span>

            <input
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              minLength={3}
            />
          </label>

          {/* Email */}
          <label>
            <span className="field-label">Email</span>

            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          {/* Password */}
          <label>
            <span className="field-label">Password</span>

            <input
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </label>

          {/* Confirm Password */}
          <label>
            <span className="field-label">Confirm Password</span>

            <input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password again"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
            />
          </label>

          {/* Submit */}
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Sign up'}
            <span>→</span>
          </Button>
        </div>

        <p>
          Already a member?{' '}
          <Link to="/login">Log in</Link>
        </p>
      </form>
    </section>
  );
}

export default Signup;