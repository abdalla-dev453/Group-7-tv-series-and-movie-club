import theme from '../theme.js';

const Footer = () => (
  <footer
    style={{
      background: theme.color.coalSoft,
      borderTop: `1px solid ${theme.color.coalBorder}`,
      padding: '20px 24px',
      textAlign: 'center',
      color: theme.color.textFaint,
      fontSize: 12,
    }}
  >
    <span
      style={{
        color: theme.color.gold,
        fontWeight: 600,
      }}
    >
      Reel Club
    </span>

    {' — '}
    for people who talk about the ending before the credits roll.
    {' © '}
    {new Date().getFullYear()}
  </footer>
);

export default Footer;