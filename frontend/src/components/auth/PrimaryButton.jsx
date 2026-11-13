export default function PrimaryButton({ children, loading, loadingLabel, ...props }) {
  return (
    <button className="auth-primary-button" {...props} disabled={props.disabled || loading}>
      {loading ? loadingLabel : children}
    </button>
  );
}
