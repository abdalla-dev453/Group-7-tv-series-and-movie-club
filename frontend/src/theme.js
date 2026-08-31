const theme = {
  color: {
    amber: "#D4AF37",
    amberSoft: "#E6C669",
    gold: "#D4AF37",
    goldDeep: "#997a00",

    coal: "#09090b",
    coalSoft: "#131316",
    coalCard: "#18181b",
    coalBorder: "#27272a",

    text: "#f4f4f5",
    textDim: "#a1a1aa",
    textFaint: "#71717a",
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    pill: "999px",
  },

  shadow: {
    card: "0 8px 30px rgba(0, 0, 0, 0.4)",
    glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
  },

  font: {
    heading: '"Playfair Display", serif',
    body: '"Inter", sans-serif',
  },
};

export const buttonStyles = {
  base: {
    border: "none",
    borderRadius: theme.radius.pill,
    padding: "8px 16px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  primary: {
    background: theme.color.amber,
    color: "#1a1204",
  },

  ghost: {
    background: "transparent",
    color: theme.color.text,
    border: `1px solid ${theme.color.coalBorder}`,
  },

  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

export default theme;
