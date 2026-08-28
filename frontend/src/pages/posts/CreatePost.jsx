import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieSearch from '../../components/movies/MovieSearch';
import { createPost } from '../../services/postService';
import Button from '../../components/Button';

function CreatePost() {
  const [movie, setMovie] = useState(null); // { tmdb_id, title, year, poster_url }
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const clubId = location.state?.clubId;

  const submit = async (e) => {
    e.preventDefault();
    const movieTitle = movie?.title || topic.trim();
    if (!movieTitle) return;
    setSubmitting(true);
    setError(null);
    try {
      const { data } = await createPost({
        movie_title: movieTitle,
        ...(movie?.tmdb_id ? { tmdb_id: movie.tmdb_id } : {}),
        ...(clubId ? { club_id: clubId } : {}),
        description,
      });
      navigate(`/posts/${data.id}`);
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Could not post — please try again');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 480, margin: '0 auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2>{clubId ? 'Start a conversation' : 'Share what you watched'}</h2>

      <MovieSearch onSelect={setMovie} />

      {clubId && <input placeholder="Conversation topic" value={topic} onChange={(event) => setTopic(event.target.value)} />}

      {movie && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 10, border: '1px solid var(--border)', borderRadius: 8 }}>
          {movie.poster_url && <img src={movie.poster_url} alt="" style={{ width: 40, borderRadius: 4 }} />}
          <div>
            <strong>{movie.title}</strong>
            <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{movie.year}</div>
          </div>
        </div>
      )}

      <textarea
        placeholder="What did you think?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ minHeight: 100 }}
      />

      <Button type="submit" disabled={(!movie && !topic.trim()) || submitting}>
        {submitting ? 'Posting...' : 'Post'}
      </Button>
      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
    </form>
  );
}

export default CreatePost;
