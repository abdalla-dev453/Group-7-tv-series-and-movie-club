const Button = ({ children, type = 'button', ...props }) => (
  <button type={type} className="button" {...props}>
    {children}
  </button>
);

export default Button;
