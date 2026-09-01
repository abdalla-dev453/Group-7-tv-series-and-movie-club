import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../../components/movies/MovieCard';
import ClubCard from '../Clubs/ClubCard';
import { getTrendingMovies } from '../../services/movieService';
import { getClubs } from '../../services/clubService';
import { getUsers } from '../../services/userService';
import { followUser, unfollowUser, getFollowing } from '../../services/followService';
import { useAuth } from '../../context/AuthContext.jsx';

const getItems = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  return data?.items || data?.results || data?.data || [];
};

function PersonCard({ person, followed, onFollow }) {
  const id = person.id || person.user_id;
  const name = person.username || person.name || person.email || 'Movie fan';
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <article className="discover-person" style={{
      background: 'rgba(24, 24, 27, 0.9)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '14px',
      padding: '12px 14px',
    }}>
      <Link to={id ? `/profile/${id}` : '/profile'} className="discover-person__identity" style={{ color: '#f4f4f5', textDecoration: 'none' }}>
        <span className="discover-person__avatar" style={{
          background: 'linear-gradient(135deg, #d4af37, #8b6b18)',
          color: '#181207',
          fontWeight: 800,
        }}>{initials}</span>
        <span><strong style={{ color: '#f4f4f5' }}>{name}</strong><small style={{ color: '#a1a1aa' }}>{person.bio || 'Cinema enthusiast'}</small></span>
      </Link>
      <button type="button" className="discover-follow" disabled={!id} onClick={() => onFollow(id)} style={{
        background: followed ? 'transparent' : '#d4af37',
        color: followed ? '#f4f4f5' : '#181207',
        border: followed ? '1px solid rgba(255,255,255,0.15)' : '1px solid #d4af37',
        fontWeight: 700,
      }}>
        {followed ? 'Following' : 'Follow'}
      </button>
    </article>
  );
}

function Discover() {
  const { user } = useAuth();
  const [content, setContent] = useState({ movies: [], clubs: [], people: [] });
  const [loading, setLoading] = useState(true);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [peopleQuery, setPeopleQuery] = useState('');
  const [followed, setFollowed] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.id) {
      setFollowed([]);
      return undefined;
    }

    let active = true;
    getFollowing(user.id)
      .then(({ data }) => {
        if (!active) return;
        const ids = Array.isArray(data)
          ? data
              .map((person) => Number(person.id ?? person.user_id))
              .filter((value) => Number.isFinite(value))
          : [];
        setFollowed(ids);
      })
      .catch(() => {
        if (active) setFollowed([]);
      });

    return () => {
      active = false;
    };
  }, [user?.id]);

  useEffect(() => {
    let active = true;
    Promise.allSettled([getTrendingMovies(), getClubs(1, 4)])
      .then((results) => {
        if (!active) return;
        const [movies, clubs] = results;
        setContent((current) => ({
          ...current,
          movies: movies.status === 'fulfilled' ? getItems(movies.value).slice(0, 6) : [],
          clubs: clubs.status === 'fulfilled' ? getItems(clubs.value).slice(0, 4) : [],
        }));
        if (results.every((result) => result.status === 'rejected')) setError('Discover content is unavailable right now.');
      })
      .finally(() => active && setLoading(false));

    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    setPeopleLoading(true);

    getUsers(1, 12, peopleQuery)
      .then(({ data }) => {
        if (!active) return;
        const list = Array.isArray(data?.items) ? data.items : [];
        setContent((current) => ({ ...current, people: list.slice(0, 12) }));
      })
      .catch(() => {
        if (!active) return;
        setContent((current) => ({ ...current, people: [] }));
      })
      .finally(() => active && setPeopleLoading(false));

    return () => { active = false; };
  }, [peopleQuery]);

  const handleFollow = async (id) => {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) return;

    try {
      if (followed.includes(numericId)) {
        await unfollowUser(numericId);
        setFollowed((current) => current.filter((personId) => personId !== numericId));
      } else {
        await followUser(numericId);
        setFollowed((current) => [...current, numericId]);
      }
    } catch {
      setError('Could not follow that person. Please try again.');
    }
  };

  return (
    <div className="discover-page">
      <header className="discover-header">
        <div><p className="discover-kicker">Your next watch is here</p><h1>Discover</h1><p className="discover-intro">Find something worth talking about, then bring the right people into the conversation.</p></div>
        <Link to="/movies" className="discover-search-link">Search the catalogue <span aria-hidden="true">→</span></Link>
      </header>

      {error && <p className="discover-message discover-message--error">{error}</p>}
      {loading && <p className="discover-message">Finding your next favourites...</p>}

      <section className="discover-section" aria-labelledby="trending-heading">
        <div className="discover-section__heading"><div><p className="discover-kicker">Popular right now</p><h2 id="trending-heading">Trending movies</h2></div><Link to="/movies">View all</Link></div>
        {!loading && content.movies.length === 0 ? <p className="discover-muted">No trending movies to show yet.</p> : <div className="discover-movies">{content.movies.map((movie) => <MovieCard key={movie.tmdb_id || movie.id} movie={movie} />)}</div>}
      </section>

      <div className="discover-columns">
        <section className="discover-section" aria-labelledby="clubs-heading">
          <div className="discover-section__heading"><div><p className="discover-kicker">Find your people</p><h2 id="clubs-heading">Suggested clubs</h2></div><Link to="/clubs">View all</Link></div>
          <div className="discover-clubs">{content.clubs.map((club) => <ClubCard key={club.id} club={club} />)}</div>
          {!loading && content.clubs.length === 0 && <p className="discover-muted">No clubs to suggest yet.</p>}
        </section>
        <section className="discover-section" aria-labelledby="people-heading">
          <div className="discover-section__heading"><div><p className="discover-kicker">Make a connection</p><h2 id="people-heading">People to follow</h2></div></div>
          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              value={peopleQuery}
              onChange={(event) => setPeopleQuery(event.target.value.trimStart())}
              placeholder="Search for a user by username"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(9,9,11,0.5)',
                color: '#f4f4f5',
                padding: '10px 12px',
                outline: 'none',
              }}
            />
          </div>
          {peopleLoading ? <p className="discover-muted">Searching members…</p> : <div className="discover-people">{content.people.map((person) => {
            const personId = Number(person.id ?? person.user_id);
            return (
              <PersonCard
                key={person.id || person.user_id}
                person={person}
                followed={followed.includes(personId)}
                onFollow={handleFollow}
              />
            );
          })}</div>}
          {!loading && !peopleLoading && content.people.length === 0 && <p className="discover-muted">No people matched that search yet.</p>}
        </section>
      </div>
    </div>
  );
}

export default Discover;