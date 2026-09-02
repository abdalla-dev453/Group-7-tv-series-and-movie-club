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
          No, we won't pause the discussion while you get snacks.
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
    background: "rgba(9, 9, 11, 0.9)",
    color: "#e4e4e7",
    fontFamily: "Inter, system-ui, sans-serif",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    marginTop: "auto",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  },

  bottomBar: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
    fontSize: "0.85rem",
    color: "#71717a",
  },

  joke: {
    display: "flex",
    alignItems: "center",
    margin: 0,
    color: "#a1a1aa",
    fontStyle: "italic",
  },

  copyright: {
    display: "flex",
    alignItems: "center",
    margin: 0,
  },
};

export default Footer;