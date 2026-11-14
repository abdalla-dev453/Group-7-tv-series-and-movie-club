import { useState, useEffect } from 'react';
import useMovieWatch from './useMovieWatch';
import TrailerPlayer from './TrailerPlayer';
import WatchProviders from './WatchProviders';
import { logWatched } from '../../services/watchedService';
import './watch.css';

export default function WatchSection({ tmdbId, movieTitle, poster }) {
  const {
    watchData, providers, country, setCountry, trailerLoading, providersLoading, error, refetch,
  } = useMovieWatch(tmdbId);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [logged, setLogged] = useState(false);
  const [logLoading, setLogLoading] = useState(false);
  const [logMessage, setLogMessage] = useState('');

  // Update selected video if watchData changes
  useEffect(() => {
    if (watchData?.primary_trailer) {
      setSelectedVideo(watchData.primary_trailer);
    }
  }, [watchData]);

  const activeTrailer = selectedVideo || watchData?.primary_trailer;
  const youtubeVideos = (watchData?.videos || []).filter((v) => v.site === 'YouTube' && v.key);

  const handleMarkWatched = async () => {
    if (logged || logLoading) return;
    setLogLoading(true);
    setLogMessage('');
    try {
      await logWatched({
        movie_title: movieTitle || watchData?.title || `Movie #${tmdbId}`,
        poster_url: poster || null,
      });
      setLogged(true);
      setLogMessage('Added to your watched movies!');
      setTimeout(() => setLogMessage(''), 4000);
    } catch {
      setLogMessage('Could not log as watched. Please ensure you are logged in.');
      setTimeout(() => setLogMessage(''), 4000);
    } finally {
      setLogLoading(false);
    }
  };

  return (
    <section className="watch-section" aria-labelledby="watch-section-heading">
      <div className="watch-section-heading">
        <div>
          <p className="watch-eyebrow">Official clips and legal options</p>
          <h2 id="watch-section-heading">Watch</h2>
        </div>
        <div className="watch-quick-actions">
          <button
            type="button"
            className={`watch-log-button ${logged ? 'logged' : ''}`}
            onClick={handleMarkWatched}
            disabled={logLoading || logged}
            aria-label="Mark movie as watched"
          >
            {logged ? '✓ In Watched List' : logLoading ? 'Logging...' : '+ Mark as Watched'}
          </button>
          {logMessage && <span className="watch-log-toast" role="status">{logMessage}</span>}
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
          <h3>Trailer & Clips</h3>
          <TrailerPlayer
            trailer={activeTrailer}
            videos={youtubeVideos}
            poster={poster}
            loading={trailerLoading}
            onSelectVideo={setSelectedVideo}
          />
        </div>
        <WatchProviders
          providers={providers}
          country={country}
          onCountryChange={setCountry}
          loading={providersLoading}
        />
      </div>
    </section>
  );
}
