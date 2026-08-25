import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../../services/movieService';
import MovieDetailsPanel from '../../components/movies/MovieDetails';

function MovieDetailsPage() {
  const { tmdbId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMovie(tmdbId)
      .then((res) => setMovie(res.data))
      .catch((err) => {
        setError(err.response?.status === 404 ? 'Movie not found' : 'Could not load movie details');
      })
      .finally(() => setLoading(false));
  }, [tmdbId]);

  if (loading) return <p style={{ padding: 24 }}>Loading...</p>;
  if (error) return <p style={{ padding: 24, color: 'var(--danger)' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <MovieDetailsPanel movie={movie} />
    </div>
  );
}

export default MovieDetailsPage;
