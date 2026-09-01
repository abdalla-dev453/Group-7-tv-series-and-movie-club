import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../../services/postService';
import { getReviewsForPost, createReview, updateReview } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import theme, { buttonStyles } from '../../theme';

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
  if (error) return <p style={{ padding: 24, color: theme.color.textFaint }}>{error}</p>;
  if (!post) return null;

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 48px' }}>
      <div
        style={{
          background: theme.color.coalCard,
          border: `1px solid ${theme.color.coalBorder}`,
          borderRadius: theme.radius.lg,
          padding: '28px 24px',
          boxShadow: theme.shadow.card,
        }}
      >
        {post.tmdb_id ? (
          <Link to={`/movies/${post.tmdb_id}`} style={{ textDecoration: 'none' }}>
            <h2 style={{ color: theme.color.amber, margin: 0, fontFamily: theme.font.heading, fontSize: 36 }}>{post.movie_title}</h2>
          </Link>
        ) : (
          <h2 style={{ margin: 0, fontFamily: theme.font.heading, fontSize: 36 }}>{post.movie_title}</h2>
        )}

        <p style={{ color: theme.color.textDim, margin: '8px 0 16px' }}>by {post.author_name}</p>
        <p style={{ margin: 0, color: theme.color.text, lineHeight: 1.7 }}>{post.description}</p>

        <div style={{ marginTop: 32 }}>
          <h3 style={{ margin: '0 0 16px', color: theme.color.text, fontSize: 18, letterSpacing: '0.02em' }}>
            Reviews ({reviews.length})
          </h3>

          <div style={{ display: 'grid', gap: 14 }}>
            {reviews.map((r) => (
              <div
                key={r.id}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${theme.color.coalBorder}`,
                  borderRadius: theme.radius.md,
                  padding: '16px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                  <strong style={{ color: theme.color.text }}>{r.author_name}</strong>
                  {r.club && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: theme.color.amberSoft,
                        background: 'rgba(255,191,68,0.12)',
                        border: `1px solid ${theme.color.coalBorder}`,
                        borderRadius: 999,
                        padding: '4px 8px',
                      }}
                    >
                      {r.club.name}
                    </span>
                  )}
                  <span aria-label={`${r.rating} out of 5 stars`} style={{ display: 'inline-flex', gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span key={value} style={{ color: value <= r.rating ? theme.color.amber : theme.color.textFaint, fontSize: 13 }}>★</span>
                    ))}
                  </span>
                </div>
                <p style={{ margin: 0, color: theme.color.textDim, lineHeight: 1.7 }}>{r.comment_text}</p>
              </div>
            ))}
          </div>
        </div>

        {!isOwnPost && (
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${theme.color.coalBorder}` }}>
            <p style={{ margin: '0 0 10px', color: theme.color.textDim, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: 12 }}>
              Your review
            </p>
            <div role="group" aria-label="Rating" style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
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
                    color: value <= rating ? theme.color.amber : theme.color.textFaint,
                    cursor: 'pointer',
                    fontSize: 28,
                    padding: '0 2px',
                    lineHeight: 1,
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
              style={{
                width: '100%',
                minHeight: 110,
                resize: 'vertical',
                background: theme.color.coal,
                border: `1px solid ${theme.color.coalBorder}`,
                borderRadius: theme.radius.md,
                color: theme.color.text,
                padding: '12px 14px',
                boxSizing: 'border-box',
                marginBottom: 16,
              }}
            />

            <button
              type="button"
              disabled={!rating}
              onClick={submitReview}
              style={{
                ...buttonStyles.base,
                ...buttonStyles.primary,
                ...( !rating ? buttonStyles.disabled : {}),
                minWidth: 150,
              }}
            >
              {myReview ? 'Update review' : 'Post review'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
