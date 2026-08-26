import React from 'react';

const Footer = () => (
  <footer
    className="site-footer"
    style={{
      marginLeft: '220px', // Matches your navbar width offset
      width: 'calc(100% - 220px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1.5rem 1rem',
      textAlign: 'center',
      boxSizing: 'border-box',
      color: '#888',
      fontSize: '0.9rem',
    }}
  >
    <p style={{ margin: 0 }}>
      <strong style={{ color: '#fff' }}>CineClub</strong> — No, we won&apos;t pause the movie while you get snacks. © {new Date().getFullYear()}
    </p>
  </footer>
);

export default Footer;