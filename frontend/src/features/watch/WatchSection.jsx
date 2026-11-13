import useMovieWatch from './useMovieWatch';
import TrailerPlayer from './TrailerPlayer';
import WatchProviders from './WatchProviders';
import './watch.css';

export default function WatchSection({ tmdbId, poster }) {
  const {
    watchData, providers, country, setCountry, trailerLoading, providersLoading, error, refetch,
  } = useMovieWatch(tmdbId);

  return (
    <section className="watch-section" aria-labelledby="watch-section-heading">
      <div className="watch-section-heading">
        <div>
          <p className="watch-eyebrow">Official clips and legal options</p>
          <h2 id="watch-section-heading">Watch</h2>
        </div>
      </div>
      {error && (
        <div className="watch-error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={refetch}>Retry</button>
        </div>
      )}
      <div className="watch-content">
        <div className="watch-trailer-column">
          <h3>Trailer</h3>
          <TrailerPlayer trailer={watchData?.primary_trailer} poster={poster} loading={trailerLoading} />
        </div>
        <WatchProviders providers={providers} country={country} onCountryChange={setCountry} loading={providersLoading} />
      </div>
    </section>
  );
}
