export default function FormField({ id, label, error, children, hint }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={`auth-field${error ? ' auth-field--invalid' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}
      {hint && <p className="auth-field__hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="auth-field__error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  );
}
