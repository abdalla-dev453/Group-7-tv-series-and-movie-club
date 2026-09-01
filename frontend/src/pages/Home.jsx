import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import theme from "../theme.js";
import { getTrendingMovies } from "../services/movieService";
import { getClubs } from "../services/clubService";
import { getFeed } from "../services/postService";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [myClubs, setMyClubs] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    Promise.allSettled([
      getTrendingMovies(),
      getClubs(1, 50),
      getFeed(1, 4),
    ]).then(([trendingRes, clubsRes, feedRes]) => {
      if (!active) return;

      if (trendingRes.status === "fulfilled") {
        setTrending(trendingRes.value.data?.items || []);
      }

      if (clubsRes.status === "fulfilled") {
        const allClubs = clubsRes.value.data?.items || clubsRes.value.data || [];
        setMyClubs(allClubs.filter((c) => c.is_member));
      }

      if (feedRes.status === "fulfilled") {
        setRecentPosts(feedRes.value.data?.items || feedRes.value.data || []);
      }

      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  // Rotate the hero through up to 3 trending movies
  useEffect(() => {
    if (trending.length < 2) return;
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prev) => (prev + 1) % Math.min(trending.length, 3));
    }, 30000);
    return () => clearInterval(interval);
  }, [trending]);

  const heroCandidates = trending.slice(0, 3);
  const featured = heroCandidates[currentFeaturedIndex];

  return (
    <main
      className="home-page"
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        background: theme.color.coal,
        color: theme.color.text,
        padding: "32px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1250px", margin: "0 auto" }}>
        {/* ================= HERO ================= */}
        <section
          style={{
            position: "relative",
            minHeight: "420px",
            overflow: "hidden",
            borderRadius: theme.radius.lg,
            border: `1px solid ${theme.color.coalBorder}`,
            boxShadow: theme.shadow.card,
            display: "flex",
            alignItems: "center",
          }}
        >
          {heroCandidates.map((movie, index) => (
            <div
              key={movie.tmdb_id}
              style={{
                position: "absolute",
                inset: 0,
                opacity: index === currentFeaturedIndex ? 1 : 0,
                transition: "opacity 1.5s ease-in-out",
                backgroundImage: `
                  linear-gradient(90deg, rgba(9,9,11,0.98) 0%, rgba(9,9,11,0.8) 45%, rgba(9,9,11,0.2) 100%),
                  linear-gradient(0deg, rgba(9,9,11,0.6) 0%, rgba(9,9,11,0) 30%),
                  url("${movie.poster_url || ""}")
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
              }}
            />
          ))}

          <div
            key={featured?.tmdb_id || "empty"}
            style={{ position: "relative", zIndex: 2, maxWidth: "620px", padding: "50px" }}
          >
            <div
              style={{
                color: theme.color.amber,
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Trending this week
            </div>

            <h1
              style={{
                fontFamily: theme.font.heading,
                fontSize: "clamp(48px, 6vw, 76px)",
                lineHeight: 0.95,
                margin: "0 0 18px",
                color: theme.color.text,
              }}
            >
              {loading ? "Loading..." : featured?.title || "Nothing trending yet"}
            </h1>

            <p style={{ color: theme.color.textDim, maxWidth: "570px", lineHeight: 1.7, fontSize: "15px", margin: "0 0 22px" }}>
              {featured?.year ? `Released ${featured.year} · ` : ""}
              {featured ? "See what the community is watching this week." : "Check back once movies start trending."}
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {featured && (
                <Link
                  to={`/movies/${featured.tmdb_id}`}
                  style={{
                    background: theme.color.amber,
                    color: "#181207",
                    padding: "11px 20px",
                    borderRadius: "7px",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  ▶ View Details
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ================= MAIN GRID ================= */}
        <div className="home-main-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 280px", gap: "20px", marginTop: "22px" }}>
          <div className="home-content-column">
            {/* ================= CLUBS ================= */}
            <section style={{ marginBottom: "30px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h2 style={{ fontFamily: theme.font.heading, fontSize: "21px", margin: 0 }}>My Active Clubs</h2>
                <Link to="/clubs" style={{ color: theme.color.textDim, fontSize: "12px", textDecoration: "none" }}>View all →</Link>
              </div>

              {!loading && myClubs.length === 0 && (
                <p style={{ color: theme.color.textDim, fontSize: 13 }}>
                  You haven't joined any clubs yet. <Link to="/clubs" style={{ color: theme.color.amber }}>Browse clubs →</Link>
                </p>
              )}

              <div className="home-club-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "12px" }}>
                {myClubs.slice(0, 3).map((club) => (
                  <Link
                    key={club.id}
                    to={`/clubs/${club.id}`}
                    style={{
                      textDecoration: "none",
                      color: theme.color.text,
                      background: theme.color.coalCard,
                      border: `1px solid ${theme.color.coalBorder}`,
                      borderRadius: "8px",
                      padding: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        flexShrink: 0,
                        borderRadius: "8px",
                        background: theme.color.coalSoft,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: 800,
                        color: theme.color.amber,
                      }}
                    >
                      {club.name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>{club.name}</div>
                      <div style={{ color: theme.color.textDim, fontSize: "11px" }}>
                        {club.member_count ?? 0} members
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* ================= RECOMMENDED (trending movies) ================= */}
            <section>
              <div className="home-recommendations" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <h2 style={{ fontFamily: theme.font.heading, fontSize: "21px", margin: 0 }}>Trending Now</h2>
                <Link to="/movies" style={{ color: theme.color.textDim, fontSize: "12px", textDecoration: "none" }}>View all →</Link>
              </div>

              {!loading && trending.length === 0 && (
                <p style={{ color: theme.color.textDim, fontSize: 13 }}>No trending movies available right now.</p>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "14px" }}>
                {trending.slice(0, 4).map((movie) => (
                  <Link key={movie.tmdb_id} to={`/movies/${movie.tmdb_id}`} style={{ textDecoration: "none", color: theme.color.text }}>
                    <div style={{ height: "230px", borderRadius: "7px", overflow: "hidden", background: theme.color.coalCard, border: `1px solid ${theme.color.coalBorder}` }}>
                      {movie.poster_url ? (
                        <img src={movie.poster_url} alt={movie.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      ) : null}
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 700, marginTop: "8px" }}>{movie.title}</div>
                    <div style={{ color: theme.color.textDim, fontSize: "11px", marginTop: "4px" }}>{movie.year}</div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* ================= RECENT ACTIVITY ================= */}
          <aside
            className="home-thread-panel"
            style={{ background: theme.color.coalCard, border: `1px solid ${theme.color.coalBorder}`, borderRadius: theme.radius.md, padding: "18px", alignSelf: "start" }}
          >
            <h2 style={{ fontFamily: theme.font.heading, fontSize: "17px", margin: "0 0 15px" }}>💬 Recent Activity</h2>

            {!loading && recentPosts.length === 0 && (
              <p style={{ color: theme.color.textDim, fontSize: 13 }}>No posts yet — be the first to share what you watched.</p>
            )}

            {recentPosts.map((post, index) => (
              <div
                key={post.id}
                style={{
                  padding: "14px 0",
                  borderBottom: index !== recentPosts.length - 1 ? `1px solid ${theme.color.coalBorder}` : "none",
                }}
              >
                <Link to={`/posts/${post.id}`} style={{ color: theme.color.text, fontSize: "13px", fontWeight: 700, lineHeight: 1.4, textDecoration: "none" }}>
                  {post.movie_title || "Untitled"}
                </Link>
                <div style={{ color: theme.color.textDim, fontSize: "11px", marginTop: "7px" }}>
                  {post.description ? post.description.slice(0, 60) : ""}
                </div>
                <div style={{ color: theme.color.textDim, fontSize: "11px", marginTop: "8px" }}>
                  💬 {post.review_count ?? 0} reviews
                </div>
              </div>
            ))}

            <Link
              to="/feed"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "14px",
                padding: "9px",
                border: `1px solid ${theme.color.coalBorder}`,
                borderRadius: "6px",
                color: theme.color.text,
                textDecoration: "none",
                fontSize: "12px",
              }}
            >
              View Full Feed
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Home;