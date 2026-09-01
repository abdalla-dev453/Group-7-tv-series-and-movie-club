import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import theme from '../../theme';
import { getClubs } from '../../services/clubService.js';
import Loader from '../../components/common/Loader.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

const ClubList = () => {
  const [state, setState] = useState({
    status: 'loading',
    clubs: [],
  });

  useEffect(() => {
    const controller = new AbortController();

    getClubs(1, 20, controller.signal)
      .then(({ data }) => {
        setState({
          status: 'success',
          clubs: Array.isArray(data?.items) ? data.items : [],
        });
      })
      .catch((error) => {
        if (error.code !== 'ERR_CANCELED') {
          setState({
            status: 'error',
            clubs: [],
          });
        }
      });

    return () => controller.abort();
  }, []);

  /* ================= LOADING ================= */
  if (state.status === 'loading') {
    return (
      <main
        style={{
          marginLeft: '220px',
          minHeight: '100vh',
          boxSizing: 'border-box',
          padding: '32px',
        }}
      >
        <Loader />
      </main>
    );
  }

  /* ================= ERROR ================= */
  if (state.status === 'error') {
    return (
      <main
        style={{
          marginLeft: '220px',
          minHeight: '100vh',
          boxSizing: 'border-box',
          padding: '32px',
        }}
      >
        <ErrorMessage message="Could not load clubs. Please try again." />
      </main>
    );
  }

  return (
    <main
      style={{
        marginLeft: '220px',
        minHeight: '100vh',
        width: 'calc(100% - 220px)',
        boxSizing: 'border-box',
        padding: '32px',
        background: theme.color.coal,
        color: theme.color.text,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1250px',
          margin: '0 auto',
        }}
      >
        {/* ================= PAGE HEADER ================= */}
        <header
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '28px',
            padding: '32px',
            minHeight: '220px',
            boxSizing: 'border-box',
            borderRadius: '18px',
            border: `1px solid ${theme.color.coalBorder}`,
            background: `linear-gradient(135deg, ${theme.color.coalCard} 0%, ${theme.color.coalSoft} 100%)`,
            boxShadow: theme.shadow.card,
          }}
        >
          <div
            style={{
              maxWidth: '650px',
            }}
          >
            <p
              style={{
                margin: '0 0 12px',
                color: theme.color.amber,
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              Find your people
            </p>

            <h1
              style={{
                margin: 0,
                fontFamily: theme.font.heading,
                fontSize: 'clamp(42px, 5vw, 68px)',
                lineHeight: 0.95,
                color: theme.color.text,
              }}
            >
              Every genre needs a room.
            </h1>
          </div>

          <Link
            to="/clubs/new"
            style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '13px 22px',
              borderRadius: '999px',
              background: theme.color.amber,
              color: '#17130b',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 800,
              whiteSpace: 'nowrap',
            }}
          >
            Start a club
          </Link>
        </header>

        {/* ================= EMPTY STATE ================= */}
        {state.clubs.length === 0 ? (
          <div
            style={{
              padding: '40px',
              borderRadius: '16px',
              border: `1px solid ${theme.color.coalBorder}`,
              background: theme.color.coalCard,
            }}
          >
            <EmptyState
              title="No clubs yet"
              message="Create the first club for your favourite genre."
            />
          </div>
        ) : (
          /* ================= CLUB GRID ================= */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '18px',
            }}
          >
            {state.clubs.map((club) => (
              <Link
                key={club.id}
                to={`/clubs/${club.id}`}
                style={{
                  display: 'block',
                  minHeight: '210px',
                  padding: '24px',
                  boxSizing: 'border-box',
                  borderRadius: '16px',
                  border: `1px solid ${theme.color.coalBorder}`,
                  background: theme.color.coalCard,
                  color: theme.color.text,
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                }}
              >
                <p
                  style={{
                    margin: '0 0 34px',
                    color: theme.color.amber,
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '1.8px',
                    textTransform: 'uppercase',
                  }}
                >
                  {club.genre || 'Open genre'}
                </p>

                <h2
                  style={{
                    margin: '0 0 10px',
                    fontFamily: theme.font.heading,
                    fontSize: '25px',
                    lineHeight: 1.1,
                    color: theme.color.text,
                  }}
                >
                  {club.name}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: theme.color.textDim,
                    fontSize: '14px',
                    lineHeight: 1.6,
                  }}
                >
                  {club.description ||
                    'A new circle is waiting for its first conversation.'}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ClubList;