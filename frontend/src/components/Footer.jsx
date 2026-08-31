import React from "react";
import {
  Clapperboard,
  Flame,
  Popcorn,
  Star,
  CalendarDays,
  Send,
  Film,
  Sparkles,
  Tv
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="site-footer" style={styles.footer}>
      {/* Top Ambient Glow Line */}
      <div style={styles.accentBar} />

      <div style={styles.container}>
        {/* Brand & Newsletter Section */}
        <div style={styles.brandSection}>
          <div style={styles.logoWrapper}>
            <Clapperboard size={26} style={styles.logoIcon} />
            <h2 style={styles.logo}>
              Cine<span style={styles.logoAccent}>Club</span>
            </h2>
          </div>
          <p style={styles.tagline}>
            Your ultimate spot for binge-watchers, film buffs, and casual movie night lovers.
          </p>
          <form style={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter email for movie night drops..."
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              <Send size={15} style={{ marginRight: "0.4rem" }} />
              Join
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div style={styles.col}>
          <h3 style={styles.colHeader}>
            <Film size={18} style={styles.headerIcon} /> Explore
          </h3>
          <ul style={styles.linkList}>
            <li>
              <a href="#trending" style={styles.link}>
                <Flame size={15} style={styles.linkIcon} /> Trending Now
              </a>
            </li>
            <li>
              <a href="#watchlist" style={styles.link}>
                <Popcorn size={15} style={styles.linkIcon} /> Community Picks
              </a>
            </li>
            <li>
              <a href="#reviews" style={styles.link}>
                <Star size={15} style={styles.linkIcon} /> Hot Takes
              </a>
            </li>
            <li>
              <a href="#schedule" style={styles.link}>
                <CalendarDays size={15} style={styles.linkIcon} /> Watch Parties
              </a>
            </li>
          </ul>
        </div>

        {/* Dynamic Genres */}
        <div style={styles.col}>
          <h3 style={styles.colHeader}>
            <Tv size={18} style={styles.headerIcon} /> Favorites
          </h3>
          <div style={styles.tagGrid}>
            {["Sci-Fi", "Cyberpunk", "Noir", "Anime", "Horror", "A24 Style", "K-Drama"].map((genre) => (
              <span key={genre} style={styles.tag}>
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <p style={styles.joke}>
          <Popcorn size={16} style={{ color: "var(--accent, #e50914)", marginRight: "0.4rem" }} />
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

// Inline styles for complete isolation
const styles = {
  footer: {
    position: "relative",
    background: "rgba(9, 9, 11, 0.9)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    color: "#e4e4e7",
    fontFamily: "Inter, system-ui, sans-serif",
    paddingTop: "3rem",
    paddingBottom: "2rem",
    marginTop: "auto",
  },
  accentBar: {
    position: "absolute",
    top: 0,
    left: "10%",
    right: "10%",
    height: "1px",
    background: "linear-gradient(90deg, transparent, var(--accent, #e50914), transparent)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "2.5rem",
  },
  brandSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  logoIcon: {
    color: "var(--accent, #e50914)",
  },
  logo: {
    margin: 0,
    fontFamily: "Playfair Display, Georgia, serif",
    fontSize: "1.75rem",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    color: "#ffffff",
  },
  logoAccent: {
    color: "var(--accent, #e50914)",
  },
  tagline: {
    margin: 0,
    fontSize: "0.88rem",
    color: "#a1a1aa",
    lineHeight: "1.5",
  },
  newsletterForm: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  input: {
    padding: "0.6rem 0.8rem",
    borderRadius: "6px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    fontSize: "0.85rem",
    flex: 1,
    outline: "none",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.6rem 1rem",
    borderRadius: "6px",
    border: "none",
    background: "var(--accent, #e50914)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "0.85rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  colHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    margin: 0,
    fontSize: "1rem",
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: "0.5px",
  },
  headerIcon: {
    color: "var(--accent, #e50914)",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  link: {
    display: "flex",
    alignItems: "center",
    color: "#a1a1aa",
    textDecoration: "none",
    fontSize: "0.88rem",
    transition: "color 0.2s ease",
  },
  linkIcon: {
    marginRight: "0.5rem",
    color: "#71717a",
  },
  tagGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
  },
  tag: {
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "0.25rem 0.65rem",
    borderRadius: "12px",
    fontSize: "0.75rem",
    color: "#d4d4d8",
  },
  divider: {
    maxWidth: "1200px",
    margin: "2.5rem auto 1.5rem auto",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
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