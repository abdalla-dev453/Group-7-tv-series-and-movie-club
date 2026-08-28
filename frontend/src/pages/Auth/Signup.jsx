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

    if (error) setError(null);

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setError(null);

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
      const signupData = {
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };

      await signup(signupData);
      navigate('/', { replace: true });
    } catch (err) {
      const status = err.response?.status;

      setError(
        status === 400 || status === 409
          ? err.response?.data?.error || err.response?.data?.message || 'Please check your information and try again.'
          : !err.response
            ? 'Network error. Check your connection and try again.'
            : 'Could not create account. Please try again shortly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section 
      className="auth-shell"
      style={{
        marginLeft: '180px', // Reduced offset to pull content leftward
        marginRight: '80px',  // Slight right margin push
        width: 'calc(100% - 260px)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '2rem',
      }}
    >
      {/* Visual / Brand Panel */}
      <aside className="auth-poster" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p className="eyebrow">WELCOME TO CINECLUB</p>
        <h1>CREATE AN ACCOUNT.</h1>
        <p>Connect with movie lovers build watchlists, and track what you're watching.</p>
      </aside>

      {/* Form Section */}
      <form 
        className="auth-form" 
        onSubmit={submit} 
        noValidate
        style={{ width: '100%', maxWidth: '420px' }}
      >
        <p className="eyebrow">New Account</p>
        <h2>Sign up.</h2>

        {error && (
          <p className="error-message" role="alert" id="signup-error">
            {error}
          </p>
        )}

        <div className="form-stack">
          <label>
            <span className="field-label">Username</span>
            <input
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              aria-describedby={error ? "signup-error" : undefined}
              required
              minLength={3}
            />
          </label>

          <label>
            <span className="field-label">Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@gmail.com"
              value={form.email}
              onChange={handleChange}
              aria-describedby={error ? "signup-error" : undefined}
              required
            />
          </label>

          <label>
            <span className="field-label">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              aria-describedby={error ? "signup-error" : undefined}
              required
              minLength={8}
            />
          </label>

          <label>
            <span className="field-label">Confirm Password</span>
            <input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password again"
              value={form.confirmPassword}
              onChange={handleChange}
              aria-describedby={error ? "signup-error" : undefined}
              required
              minLength={8}
            />
          </label>

          <Button type="submit" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Sign up'}
            <span aria-hidden="true">→</span>
          </Button>
        </div>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </section>
  );
}

export default Signup;