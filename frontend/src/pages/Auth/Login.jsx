import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import FormField from '../../components/auth/FormField';
import PasswordInput from '../../components/auth/PasswordInput';
import PrimaryButton from '../../components/auth/PrimaryButton';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    const nextErrors = {};
    if (!username.trim()) nextErrors.username = 'Enter your username.';
    if (!password) nextErrors.password = 'Enter your password.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setError(null);
    setSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate('/', { replace: true });
    } catch (err) {
      const status = err.response?.status;
      setError(status === 401 || status === 400
        ? 'Invalid username or password.'
        : !err.response
          ? 'Unable to connect to the server. Please check your connection.'
          : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to catch up on the films and conversations you love."
        footer={<>New to CineClub? <Link to="/signup">Create an account</Link></>}
      >
        <form className="auth-form" onSubmit={submit} noValidate>
          {error && (
            <div className="auth-alert" role="alert">
              <span>{error}</span>
              <button type="button" onClick={() => setError(null)} aria-label="Dismiss error"><X size={17} /></button>
            </div>
          )}
          <FormField id="login-username" label="Username" error={errors.username}>
            {(fieldProps) => <input {...fieldProps} name="username" type="text" autoComplete="username" placeholder="Your username" value={username} onChange={(event) => setUsername(event.target.value)} required />}
          </FormField>
          <FormField id="login-password" label="Password" error={errors.password}>
            {(fieldProps) => <PasswordInput {...fieldProps} name="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} invalid={fieldProps['aria-invalid']} describedBy={fieldProps['aria-describedby']} />}
          </FormField>
          <PrimaryButton type="submit" loading={submitting} loadingLabel="Signing in…">Sign in <span aria-hidden="true">→</span></PrimaryButton>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default Login;
