import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../../services/postService';
import { getReviewsForPost, createReview, updateReview } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';

function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [draft, setDraft] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([getPost(id), getReviewsForPost(id)])
      .then(([postRes, reviewsRes]) => {
        setPost(postRes.data);
        setReviews(reviewsRes.data.items || reviewsRes.data);
      })
      .catch((err) => {
        setError(err.response?.status === 404 ? 'Post not found' : 'Could not load this post');
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Backend rejects this for the post's own author (self-review guard, fix 1.2) —
  // reflect that in the UI rather than letting it round-trip to a 403.
  const isOwnPost = post && user && post.user_id === user.id;
  const myReview = reviews.find((r) => r.user_id === user?.id);

  useEffect(() => {
    if (myReview) setRating(myReview.rating);
  }, [myReview]);

  const submitReview = async () => {
    if (myReview) {
      const { data } = await updateReview(myReview.id, { rating, comment_text: draft });
      setReviews(reviews.map((r) => (r.id === data.id ? data : r)));
    } else {
      const { data } = await createReview({ post_id: Number(id), rating, comment_text: draft });
      setReviews([...reviews, data]);
    }
    setDraft('');
  };

  if (loading) return <p style={{ padding: 24 }}>Loading...</p>;
  if (error) return <p style={{ padding: 24, color: 'var(--danger)' }}>{error}</p>;
  if (!post) return null;

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 24 }}>
      {/* tmdb_id is optional — older posts or ones created without a movie
          pick won't have it, so fall back to plain text rather than a dead link */}
      {post.tmdb_id ? (
        <Link to={`/movies/${post.tmdb_id}`}>
          <h2 style={{ color: 'var(--amber)' }}>{post.movie_title}</h2>
        </Link>
      ) : (
        <h2>{post.movie_title}</h2>
      )}
      <p style={{ color: 'var(--text-dim)' }}>{post.author_name}</p>
      <p>{post.description}</p>

      <h3 style={{ marginTop: 32 }}>Reviews ({reviews.length})</h3>
      {reviews.map((r) => (
        <div key={r.id} style={{ borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <strong>{r.author_name}</strong>
            <span aria-label={`${r.rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((value) => (
                <span key={value} style={{ color: value <= r.rating ? 'var(--amber)' : 'var(--text-dim)' }}>★</span>
              ))}
            </span>
          </div>
          <p>{r.comment_text}</p>
        </div>
      ))}

      {!isOwnPost && (
        <div style={{ marginTop: 20 }}>
          <div role="group" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                aria-label={`${value} out of 5 stars`}
                aria-pressed={rating === value}
                style={{
                  border: 0,
                  background: 'transparent',
                  color: value <= rating ? 'var(--amber)' : 'var(--text-dim)',
                  cursor: 'pointer',
                  fontSize: 28,
                  padding: '0 3px',
                }}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={myReview ? 'Edit your review...' : 'Write a review...'}
            style={{ width: '100%', minHeight: 80 }}
          />
          <button type="button" disabled={!rating} onClick={submitReview}>{myReview ? 'Update review' : 'Post review'}</button>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
