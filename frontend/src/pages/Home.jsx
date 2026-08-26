import { Link } from 'react-router-dom';
import theme from '../theme.js';

const clubs = [
  {icon: 'https://plus.unsplash.com/premium_photo-1764691504277-6d9d4a9d1ba4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Sci-Fi Enthusiasts',
    members: '1,204 members',
  },
  {
    icon: 'https://images.unsplash.com/photo-1682632618859-47904338bea1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Comedy',
    members: '842 members',
  },
  {
    icon: 'https://images.unsplash.com/photo-1690650553995-cc5109870e00?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Horror House',
    members: '678 members',
  },
];

const movies = [
   {
    title: 'The Invite',
    genre: 'Comedy',
    image: 'https://media.themoviedb.org/t/p/w300_and_h450_face/b7Dr8Chzse8VagexAporUu2RtLx.jpg',
  },
  {
    title: 'M3GAN',
    genre: 'Sci-Fi',
    image: 'https://media.themoviedb.org/t/p/w300_and_h450_face/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg',
    
  },
  {
    title: 'Spider-Man: Brand New Day',
    genre: 'Action',
    image: 'https://media.themoviedb.org/t/p/w220_and_h330_face/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg',
  },
  {
    title: 'Crime 101',
    genre: 'Thriller',
    image: 'https://media.themoviedb.org/t/p/w300_and_h450_face/tVvpFIoteRHNnoZMhdnwIVwJpCA.jpg',
  },
];

const discussions = [
  {
    title: 'What makes a great 90s thriller?',
    club: 'Movie Classics',
    replies: 24,
  },
  {
    title: 'Best superhero movie of all time?',
    club: 'Action Fans',
    replies: 18,
  },
  {
    title: 'The ending of Interstellar...',
    club: 'Sci-Fi Enthusiasts',
    replies: 31,
  },
  {
    title: 'Underrated horror movies',
    club: 'Horror House',
    replies: 12,
  },
];

const Home = () => {
  return (
    <main
      className="home-page"
      style={{
        minHeight: '100vh',
        boxSizing: 'border-box',
        background: theme.color.coal,
        color: theme.color.text,
        padding: '32px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1250px',
          margin: '0 auto',
        }}
      >

        {/* ================= HERO ================= */}
        <section
          style={{
            position: 'relative',
            minHeight: '360px',
            overflow: 'hidden',
            borderRadius: theme.radius.lg,
            border: `1px solid ${theme.color.coalBorder}`,
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(10, 10, 8, 0.98) 0%,
                rgba(10, 10, 8, 0.88) 42%,
                rgba(10, 10, 8, 0.35) 100%
              ),
              url("https://www.imdb.com/title/tt1599348/mediaviewer/rm1765519616/?ref_=tt_ov_i")
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: theme.shadow.card,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: '620px',
              padding: '50px',
            }}
          >
            <div
              style={{
                color: theme.color.amber,
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Featured this week
            </div>

            <h1
              style={{
                fontFamily: theme.font.heading,
                fontSize: 'clamp(48px, 6vw, 76px)',
                lineHeight: 0.95,
                margin: '0 0 18px',
                color: theme.color.text,
              }}
            >
              Safe House
            </h1>

            <p
              style={{
                color: theme.color.textDim,
                maxWidth: '570px',
                lineHeight: 1.7,
                fontSize: '15px',
                margin: '0 0 22px',
              }}
            >
              A young CIA agent is tasked with looking after a
              dangerous fugitive in a safe house. But when the
              house is attacked, he finds himself on the run.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
              }}
            >
              <Link
                to="/movies"
                style={{
                  background: theme.color.amber,
                  color: '#181207',
                  padding: '11px 20px',
                  borderRadius: '7px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                ▶ View Details
              </Link>

              <button
                type="button"
                style={{
                  background: 'rgba(20,20,18,0.75)',
                  color: theme.color.text,
                  border: `1px solid ${theme.color.coalBorder}`,
                  padding: '10px 18px',
                  borderRadius: '7px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                ✓ Watchlist
              </button>
            </div>
          </div>
        </section>

        {/* ================= MAIN GRID ================= */}
        <div className="home-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 280px',
            gap: '20px',
            marginTop: '22px',
          }}
        >

          {/* LEFT CONTENT */}
          <div className="home-content-column">

            {/* ================= CLUBS ================= */}
            <section style={{ marginBottom: '30px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}
              >
                <h2
                  style={{
                    fontFamily: theme.font.heading,
                    fontSize: '21px',
                    margin: 0,
                  }}
                >
                  My Active Clubs
                </h2>

                <Link
                  to="/clubs"
                  style={{
                    color: theme.color.textDim,
                    fontSize: '12px',
                    textDecoration: 'none',
                  }}
                >
                  View all →
                </Link>
              </div>

              <div className="home-club-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(3, minmax(0, 1fr))',
                  gap: '12px',
                }}
              >
                {clubs.map((club) => (
                  <Link
                    key={club.name}
                    to="/clubs"
                    style={{
                      textDecoration: 'none',
                      color: theme.color.text,
                      background: theme.color.coalCard,
                      border: `1px solid ${theme.color.coalBorder}`,
                      borderRadius: '8px',
                      padding: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        flexShrink: 0,
                        borderRadius: '8px',
                        background: theme.color.coalSoft,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                      }}
                    >
                      {typeof club.icon === 'string' && club.icon.startsWith('http') ? (
  <img 
    src={club.icon} 
    alt={club.name} 
    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} 
  />
) : (
  club.icon
)}
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          marginBottom: '4px',
                        }}
                      >
                        {club.name}
                      </div>

                      <div
                        style={{
                          color: theme.color.textDim,
                          fontSize: '11px',
                        }}
                      >
                        {club.members}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* ================= RECOMMENDED ================= */}
            <section>
              <div className="home-recommendations"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                }}
              >
                <h2
                  style={{
                    fontFamily: theme.font.heading,
                    fontSize: '21px',
                    margin: 0,
                  }}
                >
                  Recommended for You
                </h2>

                <Link
                  to="/movies"
                  style={{
                    color: theme.color.textDim,
                    fontSize: '12px',
                    textDecoration: 'none',
                  }}
                >
                  View all →
                </Link>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(4, minmax(0, 1fr))',
                  gap: '14px',
                }}
              >
                {movies.map((movie) => (
                  <Link
                    key={movie.title}
                    to="/movies"
                    style={{
                      textDecoration: 'none',
                      color: theme.color.text,
                    }}
                  >
                    <div
                      style={{
                        height: '230px',
                        borderRadius: '7px',
                        overflow: 'hidden',
                        background: theme.color.coalCard,
                        border: `1px solid ${theme.color.coalBorder}`,
                      }}
                    >
                      <img
                        src={movie.image}
                        alt={movie.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </div>

                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        marginTop: '8px',
                      }}
                    >
                      {movie.title}
                    </div>

                    <div
                      style={{
                        color: theme.color.textDim,
                        fontSize: '11px',
                        marginTop: '4px',
                      }}
                    >
                      {movie.genre}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

          </div>

          {/* ================= TRENDING THREADS ================= */}
          <aside className="home-thread-panel"
            style={{
              background: theme.color.coalCard,
              border: `1px solid ${theme.color.coalBorder}`,
              borderRadius: theme.radius.md,
              padding: '18px',
              alignSelf: 'start',
            }}
          >
            <h2
              style={{
                fontFamily: theme.font.heading,
                fontSize: '17px',
                margin: '0 0 15px',
              }}
            >
              💬 Trending Threads
            </h2>

            {discussions.map((discussion, index) => (
              <div
                key={discussion.title}
                style={{
                  padding: '14px 0',
                  borderBottom:
                    index !== discussions.length - 1
                      ? `1px solid ${theme.color.coalBorder}`
                      : 'none',
                }}
              >
                <Link
                  to="/feed"
                  style={{
                    color: theme.color.text,
                    fontSize: '13px',
                    fontWeight: 700,
                    lineHeight: 1.4,
                    textDecoration: 'none',
                  }}
                >
                  {discussion.title}
                </Link>

                <div
                  style={{
                    color: theme.color.textDim,
                    fontSize: '11px',
                    marginTop: '7px',
                  }}
                >
                  {discussion.club}
                </div>

                <div
                  style={{
                    color: theme.color.textDim,
                    fontSize: '11px',
                    marginTop: '8px',
                  }}
                >
                  💬 {discussion.replies} replies
                </div>
              </div>
            ))}

            <Link
              to="/feed"
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '14px',
                padding: '9px',
                border: `1px solid ${theme.color.coalBorder}`,
                borderRadius: '6px',
                color: theme.color.text,
                textDecoration: 'none',
                fontSize: '12px',
              }}
            >
              View All Discussions
            </Link>
          </aside>

        </div>
      </div>
    </main>
  );
};

export default Home;