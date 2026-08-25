import { Link } from 'react-router-dom';
import theme from '../theme.js';

const features = [
  {
    icon: '🎬',
    title: 'Discover Movies',
    description:
      'Find movies and TV shows that match your interests and discover something new to watch.',
  },
  {
    icon: '👥',
    title: 'Join Clubs',
    description:
      'Join movie clubs, meet other fans, and take part in conversations about your favorite shows.',
  },
  {
    icon: '⭐',
    title: 'Rate & Review',
    description:
      'Rate what you watch and share your thoughts with the CineClub community.',
  },
];

const Home = () => {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: theme.color.coal,
        color: theme.color.text,
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          minHeight: '520px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 24px',
          boxSizing: 'border-box',
          background: `
            radial-gradient(
              circle at top,
              ${theme.color.coalCard},
              ${theme.color.coal}
            )
          `,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 850,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: theme.radius.pill,
              background: theme.color.amber,
              color: '#1a1204',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.7,
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Your movie community
          </div>

          <h1
            style={{
              fontFamily: theme.font.heading,
              fontSize: 'clamp(42px, 7vw, 76px)',
              lineHeight: 1.05,
              margin: '0 0 20px',
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            Welcome to{' '}
            <span
              style={{
                color: theme.color.amber,
              }}
            >
              CineClub
            </span>
          </h1>

          <p
            style={{
              maxWidth: 680,
              margin: '0 auto 32px',
              color: theme.color.textDim,
              fontSize: 18,
              lineHeight: 1.7,
            }}
          >
            Discover movies and TV shows, join communities,
            share your opinions, and connect with people who
            love watching as much as you do.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/movies"
              style={{
                display: 'inline-block',
                background: theme.color.amber,
                color: '#1a1204',
                textDecoration: 'none',
                padding: '12px 22px',
                borderRadius: theme.radius.pill,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Explore Movies
            </Link>

            <Link
              to="/clubs"
              style={{
                display: 'inline-block',
                background: 'transparent',
                color: theme.color.text,
                textDecoration: 'none',
                padding: '11px 22px',
                borderRadius: theme.radius.pill,
                border: `1px solid ${theme.color.coalBorder}`,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Explore Clubs
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '70px 24px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          <span
            style={{
              color: theme.color.amber,
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            What you can do
          </span>

          <h2
            style={{
              fontFamily: theme.font.heading,
              fontSize: 32,
              margin: '8px 0 10px',
            }}
          >
            Everything movie fans need
          </h2>

          <p
            style={{
              color: theme.color.textDim,
              margin: 0,
              fontSize: 14,
            }}
          >
            One place to discover, discuss and enjoy movies
            together.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                background: theme.color.coalCard,
                border: `1px solid ${theme.color.coalBorder}`,
                borderRadius: theme.radius.md,
                padding: 24,
                textAlign: 'center',
                boxShadow: theme.shadow.card,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  margin: '0 auto 16px',
                  borderRadius: '50%',
                  background: theme.color.coalSoft,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                }}
              >
                {feature.icon}
              </div>

              <h3
                style={{
                  fontFamily: theme.font.heading,
                  fontSize: 18,
                  margin: '0 0 10px',
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  color: theme.color.textDim,
                  fontSize: 13,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section
        style={{
          maxWidth: 1050,
          margin: '0 auto',
          padding: '20px 24px 80px',
        }}
      >
        <div
          style={{
            background: `
              linear-gradient(
                135deg,
                ${theme.color.coalCard},
                ${theme.color.coalSoft}
              )
            `,
            border: `1px solid ${theme.color.coalBorder}`,
            borderRadius: theme.radius.lg,
            padding: '45px 30px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 36,
              marginBottom: 12,
            }}
          >
            🍿
          </div>

          <h2
            style={{
              fontFamily: theme.font.heading,
              fontSize: 30,
              margin: '0 0 12px',
            }}
          >
            Don't just watch. Join the conversation.
          </h2>

          <p
            style={{
              color: theme.color.textDim,
              maxWidth: 600,
              margin: '0 auto 24px',
              lineHeight: 1.6,
              fontSize: 14,
            }}
          >
            Find people who share your taste in movies and
            TV shows. Create discussions, join clubs and
            discover your next favorite watch.
          </p>

          <Link
            to="/signup"
            style={{
              display: 'inline-block',
              background: theme.color.amber,
              color: '#1a1204',
              textDecoration: 'none',
              padding: '11px 22px',
              borderRadius: theme.radius.pill,
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Join CineClub
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;