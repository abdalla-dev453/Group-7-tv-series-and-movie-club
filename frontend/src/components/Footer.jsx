import React from "react";
import { Popcorn, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="site-footer" style={styles.footer}>
      <div style={styles.bottomBar}>
        <p style={styles.joke}>
          <Popcorn
            size={16}
            style={{
              color: "var(--accent, #e50914)",
              marginRight: "0.4rem",
            }}
          />
          No, we won&apos;t pause the movie while you get snacks.
        </p>

        <p style={styles.copyright}>
          <Sparkles size={14} style={{ marginRight: "0.3rem" }} />
          © {new Date().getFullYear()} CineClub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(9, 9, 11, 0.9)",
    color: "#e4e4e7",
    fontFamily: "Inter, system-ui, sans-serif",
    padding: "1.5rem 1rem",
    marginTop: "auto",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  },

  bottomBar: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.6rem",
    fontSize: "0.85rem",
    color: "#71717a",
    textAlign: "center",
  },

  joke: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    color: "#a1a1aa",
    fontStyle: "italic",
  },

  copyright: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    color: "#71717a",
  },
};

export default Footer;