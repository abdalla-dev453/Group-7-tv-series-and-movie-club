import { useState } from 'react';

export default function TrailerPlayer({ trailer, poster, loading }) {
  const [started, setStarted] = useState(false);
  const isYouTube = trailer?.site === 'YouTube' && Boolean(trailer?.key);
  const thumbnail = poster || (isYouTube ? `https://i.ytimg.com/vi/${encodeURIComponent(trailer.key)}/hqdefault.jpg` : null);

  if (loading) {
    return <div className="watch-skeleton watch-trailer-skeleton" aria-label="Loading trailer" role="status" />;
  }
  if (!isYouTube) return <p className="watch-empty">No official trailer is available for this title yet.</p>;

  return (
    <div className="watch-trailer">
      <div className="watch-video-frame">
        {started ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}?autoplay=0&rel=0&modestbranding=1`}
            title={`${trailer.name || 'Official trailer'} for this movie`}
            aria-label="Official YouTube trailer"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="watch-trailer-placeholder" style={thumbnail ? { backgroundImage: `linear-gradient(rgba(10,10,12,.25),rgba(10,10,12,.7)), url("${thumbnail}")` } : undefined}>
            <button type="button" className="watch-play-button" aria-label="Play trailer" onClick={() => setStarted(true)}>
              <span aria-hidden="true">▶</span> Play trailer
            </button>
          </div>
        )}
      </div>
      <a className="watch-youtube-link" href={`https://www.youtube.com/watch?v=${encodeURIComponent(trailer.key)}`} target="_blank" rel="noopener noreferrer" aria-label="Open trailer on YouTube">
        Open trailer on YouTube ↗
      </a>
    </div>
  );
}
