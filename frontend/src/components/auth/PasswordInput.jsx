import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({ id, value, onChange, name, autoComplete, placeholder, invalid, describedBy }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="auth-password-input">
      <input
        id={id}
        name={name}
        type={visible ? 'text' : 'password'}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        required
      />
      <button type="button" className="auth-password-toggle" onClick={() => setVisible((show) => !show)} aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible}>
        {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
      </button>
    </div>
  );
}
