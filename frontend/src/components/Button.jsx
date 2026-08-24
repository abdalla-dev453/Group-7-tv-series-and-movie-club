import { buttonStyles } from '../theme.js';

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  style,
  ...props
}) => {
  const handleMouseDown = (event) => {
    if (!disabled) {
      event.currentTarget.style.transform = 'scale(0.97)';
    }
  };

  const handleMouseUp = (event) => {
    event.currentTarget.style.transform = 'scale(1)';
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <button
      type={type}
      disabled={disabled}
      style={{
        ...buttonStyles.base,
        ...(buttonStyles[variant] || buttonStyles.primary),
        ...(disabled ? buttonStyles.disabled : {}),
        ...style,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;