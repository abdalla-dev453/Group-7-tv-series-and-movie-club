import { Link } from 'react-router-dom';
import theme, { buttonStyles } from '../../theme.js';

function NotFound() {
  return (
    <div
      style={{
        maxWidth: 480,
        margin: '80px auto',
        padding: 24,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: theme.font.heading,
          fontSize: 72,
          fontWeight: 700,
          color: theme.color.amber,
          lineHeight: 1,
        }}
      >
        404
      </div>
      <h1
        style={{
          fontFamily: theme.font.heading,
          color: theme.color.text,
          fontSize: 22,
          margin: '16px 0 8px',
        }}
      >
        This page doesn't exist
      </h1>
      <p style={{ color: theme.color.textDim, fontSize: 14, marginBottom: 24 }}>
        The link might be broken, or the page may have moved.
      </p>
      <Link to="/" style={{ ...buttonStyles.base, ...buttonStyles.primary, textDecoration: 'none', display: 'inline-block' }}>
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;