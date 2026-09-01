import React, { useState } from "react";
import {
  Compass,
  Users,
  UserCheck,
  Search,
  ChevronDown,
  HelpCircle,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";

const rawFaqs = [
  {
    category: "Streaming",
    question: "Where do I watch a movie from?",
    answer:
      "CineClub helps you discover, review, and discuss titles. Use your preferred official streaming services (like Netflix, Hulu, or Prime) or physical media to watch them.",
  },
  {
    category: "Community",
    question: "How do I join a club?",
    answer:
      "Navigate to the Clubs tab, browse through our community-led watch groups, and click 'Join Club' on any community that fits your cinematic taste.",
  },
  {
    category: "Activity",
    question: "How do I log a movie?",
    answer:
      "Head over to your Watched tab or use the top search bar. Locate the title, tap 'Log Movie', leave a rating, and save it to your personal viewing history.",
  },
  {
    category: "Account",
    question: "Is CineClub free to use?",
    answer:
      "Yes! CineClub is completely free for discovering movies, keeping track of your watchlist, and engaging in community discussions.",
  },
];

const features = [
  {
    title: "Discover",
    desc: "Uncover hidden gems, curated lists, and cinephiles who match your taste profile.",
    icon: Compass,
    gradient: "linear-gradient(135deg, rgba(229, 9, 20, 0.15), rgba(229, 9, 20, 0.02))",
  },
  {
    title: "Community",
    desc: "Dive into spoiler-free threads, join live watch parties, and debate hot takes.",
    icon: Users,
    gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.02))",
  },
  {
    title: "Profile & History",
    desc: "Track your cinematic journey, log reviews, and build custom recommendations.",
    icon: UserCheck,
    gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(168, 85, 247, 0.02))",
  },
];

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = rawFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section style={styles.section}>
      {/* Background Ambient Glows */}
      <div style={styles.glowTopLeft} />
      <div style={styles.glowBottomRight} />

      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.headerGroup}>
          <div style={styles.eyebrow}>
            <Sparkles size={14} style={{ marginRight: "0.4rem", color: "var(--accent, #e50914)" }} />
            SUPPORT CENTER
          </div>
          <h1 style={styles.title}>
            How can we <span style={styles.titleGradient}>help you?</span>
          </h1>
          <p style={styles.subtitle}>
            Find answers to common questions about tracking, clubs, and navigating your CineClub journey.
          </p>

          {/* Interactive Search Bar */}
          <div style={styles.searchWrapper}>
            <Search size={18} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for questions, topics, features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div style={styles.grid}>
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  ...styles.card,
                  background: item.gradient,
                }}
                className="help-card-hover"
              >
                <div style={styles.iconBadge}>
                  <Icon size={22} style={{ color: "#fff" }} />
                </div>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardDesc}>{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* FAQ Accordion Section */}
        <div style={styles.faqSection}>
          <div style={styles.faqHeader}>
            <MessageCircleQuestion size={22} style={{ color: "var(--accent, #e50914)" }} />
            <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
          </div>

          <div style={styles.faqList}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      ...styles.faqItem,
                      borderColor: isOpen
                        ? "rgba(229, 9, 20, 0.4)"
                        : "rgba(255, 255, 255, 0.08)",
                      background: isOpen
                        ? "rgba(255, 255, 255, 0.04)"
                        : "rgba(255, 255, 255, 0.02)",
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      style={styles.faqQuestionBtn}
                    >
                      <span style={styles.questionText}>
                        <span style={styles.categoryBadge}>{faq.category}</span>
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        style={{
                          ...styles.chevron,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          color: isOpen ? "var(--accent, #e50914)" : "#71717a",
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div style={styles.faqAnswerContainer}>
                        <p style={styles.faqAnswer}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div style={styles.noResults}>
                <HelpCircle size={32} style={{ color: "#71717a", marginBottom: "0.5rem" }} />
                <p>No answers found matching &quot;{searchTerm}&quot;</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Isolated Inline Styling
const styles = {
  section: {
    position: "relative",
    padding: "5rem 1.5rem",
    background: "#09090b",
    color: "#f4f4f5",
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, sans-serif",
    overflow: "hidden",
  },
  glowTopLeft: {
    position: "absolute",
    top: "-150px",
    left: "-150px",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  glowBottomRight: {
    position: "absolute",
    bottom: "-150px",
    right: "-150px",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  container: {
    maxWidth: "960px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  headerGroup: {
    textAlign: "center",
    marginBottom: "4rem",
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "0.75rem",
    fontWeight: "700",
    letterSpacing: "2px",
    color: "#a1a1aa",
    textTransform: "uppercase",
    marginBottom: "0.75rem",
    background: "rgba(255, 255, 255, 0.05)",
    padding: "0.4rem 0.8rem",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  title: {
    fontSize: " clamp(2.2rem, 5vw, 3.5rem)",
    fontWeight: "800",
    margin: "0 0 1rem 0",
    letterSpacing: "-1px",
    lineHeight: "1.1",
  },
  titleGradient: {
    background: "linear-gradient(90deg, #ffffff, var(--accent, #e50914))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.05rem",
    color: "#a1a1aa",
    maxWidth: "600px",
    margin: "0 auto 2.5rem auto",
    lineHeight: "1.6",
  },
  searchWrapper: {
    position: "relative",
    maxWidth: "540px",
    margin: "0 auto",
  },
  searchIcon: {
    position: "absolute",
    left: "1.2rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#71717a",
  },
  searchInput: {
    width: "100%",
    padding: "1rem 1rem 1rem 3.2rem",
    borderRadius: "14px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(12px)",
    color: "#fff",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
    transition: "border-color 0.2s, background 0.2s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1.5rem",
    marginBottom: "5rem",
  },
  card: {
    padding: "2rem",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(10px)",
    transition: "transform 0.3s ease, border-color 0.3s ease",
  },
  iconBadge: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.2rem",
    border: "1px solid rgba(255, 255, 255, 0.15)",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    margin: "0 0 0.5rem 0",
    color: "#ffffff",
  },
  cardDesc: {
    fontSize: "0.9rem",
    color: "#a1a1aa",
    margin: 0,
    lineHeight: "1.5",
  },
  faqSection: {
    maxWidth: "780px",
    margin: "0 auto",
  },
  faqHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    marginBottom: "1.8rem",
  },
  faqTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: 0,
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  faqItem: {
    borderRadius: "12px",
    border: "1px solid",
    overflow: "hidden",
    transition: "all 0.25s ease",
  },
  faqQuestionBtn: {
    width: "100%",
    padding: "1.2rem 1.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "left",
  },
  questionText: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  categoryBadge: {
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "700",
    padding: "0.2rem 0.5rem",
    borderRadius: "6px",
    background: "rgba(255, 255, 255, 0.08)",
    color: "#d4d4d8",
  },
  chevron: {
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    flexShrink: 0,
    marginLeft: "1rem",
  },
  faqAnswerContainer: {
    padding: "0 1.4rem 1.2rem 1.4rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.04)",
  },
  faqAnswer: {
    margin: "0.8rem 0 0 0",
    color: "#a1a1aa",
    fontSize: "0.92rem",
    lineHeight: "1.6",
  },
  noResults: {
    textAlign: "center",
    padding: "3rem",
    color: "#71717a",
  },
};

export default Help;