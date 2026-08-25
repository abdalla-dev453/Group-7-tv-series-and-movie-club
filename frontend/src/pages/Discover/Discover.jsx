import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../../components/movies/MovieCard';
import ClubCard from '../Clubs/ClubCard';
import { getTrendingMovies } from '../../services/movieService';
import { getClubs } from '../../services/clubService';
import { getUsers } from '../../services/userService';
import { followUser } from '../../services/followService';

const getItems = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  return data?.items || data?.results || data?.data || [];
};

function PersonCard({ person, followed, onFollow }) {
  const id = person.id || person.user_id;
  const name = person.username || person.name || person.email || 'Movie fan';

  return (
    <article className="discover-person">
      <Link to={id ? `/profile/${id}` : '/profile'} className="discover-person__identity">
        <span className="discover-person__avatar">{name.charAt(0).toUpperCase()}</span>
        <span><strong>{name}</strong><small>{person.bio || 'Cinema enthusiast'}</small></span>
      </Link>
      <button type="button" className="discover-follow" disabled={!id || followed} onClick={() => onFollow(id)}>
        {followed ? 'Following' : 'Follow'}
      </button>
    </article>
  );
}

function Discover() {
  const [content, setContent] = useState({ movies: [], clubs: [], people: [] });
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.allSettled([getTrendingMovies(), getClubs(1, 4), getUsers(1, 6)])
      .then((results) => {
        if (!active) return;
        const [movies, clubs, people] = results;
        setContent({
          movies: movies.status === 'fulfilled' ? getItems(movies.value).slice(0, 6) : [],
          clubs: clubs.status === 'fulfilled' ? getItems(clubs.value).slice(0, 4) : [],
          people: people.status === 'fulfilled' ? getItems(people.value).slice(0, 6) : [],
        });
        if (results.every((result) => result.status === 'rejected')) setError('Discover content is unavailable right now.');
      })
      .finally(() => active && setLoading(false));

    return () => { active = false; };
  }, []);

  const handleFollow = async (id) => {
    try {
      await followUser(id);
      setFollowed((current) => [...current, id]);
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
          <div className="discover-people">{content.people.map((person) => <PersonCard key={person.id || person.user_id} person={person} followed={followed.includes(person.id || person.user_id)} onFollow={handleFollow} />)}</div>
          {!loading && content.people.length === 0 && <p className="discover-muted">No people to suggest yet.</p>}
        </section>
      </div>
    </div>
  );
}

export default Discover;