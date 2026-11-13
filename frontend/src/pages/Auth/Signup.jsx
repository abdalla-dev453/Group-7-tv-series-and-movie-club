import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import FormField from '../../components/auth/FormField';
import PasswordInput from '../../components/auth/PasswordInput';
import PrimaryButton from '../../components/auth/PrimaryButton';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    if (error) setError(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    const nextErrors = {};
    if (form.username.trim().length < 3) nextErrors.username = 'Username must be at least 3 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setError(null);
    setSubmitting(true);
    try {
      await signup({ username: form.username.trim(), email: form.email.trim().toLowerCase(), password: form.password });
      navigate('/', { replace: true });
    } catch (err) {
      const status = err.response?.status;
      setError(status === 400 || status === 409
        ? err.response?.data?.error || err.response?.data?.message || 'Please check your information and try again.'
        : !err.response
          ? 'Network error. Check your connection and try again.'
          : 'Could not create account. Please try again shortly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Create your account"
        subtitle="Meet fellow movie fans and keep the conversation going."
        footer={<>Already have an account? <Link to="/login">Sign in</Link></>}
      >
        <form className="auth-form" onSubmit={submit} noValidate>
          {error && (
            <div className="auth-alert" role="alert">
              <span>{error}</span>
              <button type="button" onClick={() => setError(null)} aria-label="Dismiss error"><X size={17} /></button>
            </div>
          )}
          <FormField id="signup-username" label="Username" error={errors.username}>
            {(fieldProps) => <input {...fieldProps} name="username" type="text" autoComplete="username" placeholder="Choose a username" value={form.username} onChange={handleChange} required minLength={3} />}
          </FormField>
          <FormField id="signup-email" label="Email" error={errors.email}>
            {(fieldProps) => <input {...fieldProps} name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />}
          </FormField>
          <FormField id="signup-password" label="Password" error={errors.password} hint="Use at least 8 characters.">
            {(fieldProps) => <PasswordInput {...fieldProps} name="password" autoComplete="new-password" placeholder="Create a password" value={form.password} onChange={handleChange} invalid={fieldProps['aria-invalid']} describedBy={fieldProps['aria-describedby']} />}
          </FormField>
          <FormField id="signup-confirm-password" label="Confirm password" error={errors.confirmPassword}>
            {(fieldProps) => <PasswordInput {...fieldProps} name="confirmPassword" autoComplete="new-password" placeholder="Enter it one more time" value={form.confirmPassword} onChange={handleChange} invalid={fieldProps['aria-invalid']} describedBy={fieldProps['aria-describedby']} />}
          </FormField>
          <PrimaryButton type="submit" loading={submitting} loadingLabel="Creating account…">Create account <span aria-hidden="true">→</span></PrimaryButton>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default Signup;
