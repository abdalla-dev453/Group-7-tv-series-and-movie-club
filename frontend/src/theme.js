const theme = {
  color: {
    amber: '#ffc21a',
    amberSoft: '#ffe28a',
    gold: '#ffc21a',
    goldDeep: '#c58a17',

    coal: '#0d0c08',
    coalSoft: '#17150e',
    coalCard: '#242016',
    coalBorder: '#3a3324',

    text: '#f7f0df',
    textDim: '#c0b7a5',
    textFaint: '#8f866f',
  },

  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    pill: '999px',
  },

  shadow: {
    card: '0 8px 24px rgba(0, 0, 0, 0.25)',
  },

  font: {
    heading: 'Georgia, Times New Roman, serif',
    body: 'Trebuchet MS, Segoe UI, sans-serif',
  },
};

export const buttonStyles = {
  base: {
    border: 'none',
    borderRadius: theme.radius.pill,
    padding: '8px 16px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },

  primary: {
    background: theme.color.amber,
    color: '#1a1204',
  },

  ghost: {
    background: 'transparent',
    color: theme.color.text,
    border: `1px solid ${theme.color.coalBorder}`,
  },

  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

export default theme;