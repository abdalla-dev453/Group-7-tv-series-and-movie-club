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

  const submit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setError(null);
    setSubmitting(true);

    try {
      await login(username.trim(), password);

      navigate('/', { replace: true });
    } catch (err) {
      console.error('Login error:', err);

      const status = err.response?.status;

      if (status === 401 || status === 400) {
        setError('Invalid username or password.');
      } else if (!err.response) {
        setError(
          'Unable to connect to the server. Please check your connection.'
        );
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-shell">

      {/* ================= LEFT SIDE ================= */}

      <aside className="auth-poster">
        <p className="eyebrow">
          The after-credits club
        </p>

        <h1>
          Stories are better when they linger.
        </h1>

        <p>
          Find the people who notice the details you do.
        </p>
      </aside>

      {/* ================= LOGIN FORM ================= */}

      <form
        className="auth-form"
        onSubmit={submit}
      >
        <p className="eyebrow">
          Welcome back
        </p>

        <h2>
          Resume your feature.
        </h2>

        {error && (
          <p
            className="error-message"
            role="alert"
          >
            {error}
          </p>
        )}

        <div className="form-stack">

          {/* Username */}

          <label>
            <span className="field-label">
              Username
            </span>

            <input
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              required
            />
          </label>

          {/* Password */}

          <label>
            <span className="field-label">
              Password
            </span>

            <input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </label>

          {/* Submit */}

          <Button
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? 'Logging in…'
              : 'Continue'}

            <span>→</span>
          </Button>

        </div>

        <p>
          No account?{' '}
          <Link to="/signup">
            Join the club
          </Link>
        </p>

      </form>
    </section>
  );
}

export default Login;