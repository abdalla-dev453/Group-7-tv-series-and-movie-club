import { useState } from 'react';
import MovieSearch from '../../components/movies/MovieSearch';
import MovieCard from '../../components/movies/MovieCard';
import PageContainer from '../../components/layout/PageContainer';
import ResponsiveGrid from '../../components/layout/ResponsiveGrid';
import SectionHeading from '../../components/layout/SectionHeading';

// Browse/search page — searching adds results to a running grid so the
// person can search a few titles in a row without losing earlier results.
function Movies() {
  const [found, setFound] = useState([]);

  const handleSelect = (movie) => {
    setFound((prev) => (prev.some((m) => m.tmdb_id === movie.tmdb_id) ? prev : [movie, ...prev]));
  };

  return (
    <PageContainer className="movies-page">
      <SectionHeading title="Browse movies" description="Search for a title and add it to your collection." />
      <div style={{ maxWidth: 420, marginBottom: 24 }}>
        <MovieSearch onSelect={handleSelect} />
      </div>

      <ResponsiveGrid minItemWidth="145px" className="movies-results-grid">
        {found.map((movie) => (
          <MovieCard key={movie.tmdb_id} movie={movie} />
        ))}
      </ResponsiveGrid>

      {found.length === 0 && (
        <p style={{ color: 'var(--text-dim)' }}>Search for a title to get started.</p>
      )}
    </PageContainer>
  );
}

export default Movies;
