const Footer = () => (
  <footer
    className="site-footer"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem 1rem",
      textAlign: "center",
      boxSizing: "border-box",
      background: "rgba(9, 9, 11, 0.5)",
      backdropFilter: "blur(10px)",
      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      color: "var(--muted)",
      fontSize: "0.9rem",
    }}
  >
    <p style={{ margin: 0, fontFamily: "Inter, sans-serif" }}>
      <strong
        style={{
          color: "var(--accent)",
          fontFamily: "Playfair Display, serif",
          fontSize: "1.1rem",
        }}
      >
        CineClub
      </strong>{" "}
      — No, we won&apos;t pause the movie while you get snacks. ©{" "}
      {new Date().getFullYear()}
    </p>
  </footer>
);

export default Footer;
