const styles = {
  wrap: { display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--amber)', fontSize: 14 },
  score: { fontWeight: 700 },
  outOf: { color: 'var(--text-dim)', fontSize: 12 },
};

// TMDB's vote_average is 0-10 with one decimal — shown as-is, not converted to 5 stars,
// so it's clear this is TMDB's community score, not a review on this platform.
function MovieRating({ rating }) {
  if (rating == null) return null;
  return (
    <span style={styles.wrap}>
      ★ <span style={styles.score}>{rating.toFixed(1)}</span>
      <span style={styles.outOf}>/10</span>
    </span>
  );
}

export default MovieRating;
