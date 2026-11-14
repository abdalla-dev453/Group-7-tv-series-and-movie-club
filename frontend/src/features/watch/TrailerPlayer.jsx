import { useState, useEffect } from 'react';

export default function TrailerPlayer({
  trailer,
  videos = [],
  poster,
  loading,
  onSelectVideo,
}) {
  const [started, setStarted] = useState(false);
  const [isTheater, setIsTheater] = useState(false);

  const isYouTube = trailer?.site === 'YouTube' && Boolean(trailer?.key);
  const thumbnail = poster || (isYouTube ? `https://i.ytimg.com/vi/${encodeURIComponent(trailer.key)}/hqdefault.jpg` : null);

  // Close theater mode on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isTheater) {
        setIsTheater(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTheater]);

  if (loading) {
    return <div className="watch-skeleton watch-trailer-skeleton" aria-label="Loading trailer" role="status" />;
  }

  if (!isYouTube) {
    return <p className="watch-empty">No official trailer is available for this title yet.</p>;
  }

  return (
    <div className={`watch-trailer ${isTheater ? 'watch-theater-mode' : ''}`}>
      {isTheater && (
        <div
          className="watch-theater-backdrop"
          onClick={() => setIsTheater(false)}
          aria-hidden="true"
        />
      )}

      <div className="watch-video-wrapper">
        <div className="watch-video-frame">
          {started ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}?autoplay=1&rel=0&modestbranding=1`}
              title={`${trailer.name || 'Official trailer'} for this movie`}
              aria-label="Official YouTube trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div
              className="watch-trailer-placeholder"
              style={thumbnail ? { backgroundImage: `linear-gradient(rgba(10,10,12,.25),rgba(10,10,12,.7)), url("${thumbnail}")` } : undefined}
            >
              <button
                type="button"
                className="watch-play-button"
                aria-label="Play trailer"
                onClick={() => setStarted(true)}
              >
                <span aria-hidden="true">▶</span> Play trailer
              </button>
            </div>
          )}
        </div>

        <div className="watch-player-controls">
          <button
            type="button"
            className="watch-theater-btn"
            onClick={() => setIsTheater((prev) => !prev)}
            aria-label={isTheater ? 'Exit theater mode' : 'Enter theater mode'}
          >
            {isTheater ? '⤢ Normal View' : '⤢ Theater Mode'}
          </button>
          <a
            className="watch-youtube-link"
            href={`https://www.youtube.com/watch?v=${encodeURIComponent(trailer.key)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open trailer on YouTube"
          >
            Open on YouTube ↗
          </a>
        </div>
      </div>

      {videos && videos.length > 1 && (
        <div className="watch-clips-container" aria-label="Available clips and trailers">
          <p className="watch-clips-title">Available Clips ({videos.length}):</p>
          <div className="watch-clips-list" role="tablist">
            {videos.slice(0, 6).map((vid) => {
              const active = vid.key === trailer.key;
              return (
                <button
                  type="button"
                  key={vid.key || vid.id}
                  className={`watch-clip-pill ${active ? 'active' : ''}`}
                  onClick={() => {
                    if (onSelectVideo) onSelectVideo(vid);
                    setStarted(true);
                  }}
                  aria-selected={active}
                  role="tab"
                >
                  <span className="watch-clip-badge">{vid.type || 'Clip'}</span>
                  <span className="watch-clip-name">{vid.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
