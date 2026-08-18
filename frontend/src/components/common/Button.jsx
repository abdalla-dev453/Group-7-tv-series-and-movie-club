const Button = ({ children, variant = 'primary', type = 'button', ...props }) => (
  <button type={type} className={`button button--${variant}`} {...props}>
    {children}
  </button>
);

export default Button;
