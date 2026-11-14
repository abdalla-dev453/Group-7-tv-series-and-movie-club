import { WATCH_COUNTRIES } from './watchTypes';

const GROUPS = [
  { key: 'stream', label: 'Stream', action: 'Watch on' },
  { key: 'rent', label: 'Rent', action: 'Rent on' },
  { key: 'buy', label: 'Buy', action: 'Buy on' },
];

const isValidUrl = (url) => {
  if (typeof url !== 'string' || !url.trim()) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export default function WatchProviders({ providers, country, onCountryChange, loading }) {
  const groups = GROUPS.map((group) => ({ ...group, items: providers?.[group.key] || [] }));
  const hasProviders = groups.some(({ items }) => items.length > 0);
  const countryName = WATCH_COUNTRIES.find(({ code }) => code === country)?.name || country;

  return (
    <div className="watch-options">
      <div className="watch-options-heading">
        <h3>Where to watch</h3>
        <label className="watch-country-label">
          <span>Country</span>
          <select value={country} onChange={(event) => onCountryChange(event.target.value)} aria-label="Choose country for watch options">
            {WATCH_COUNTRIES.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
          </select>
        </label>
      </div>
      {loading ? (
        <div className="watch-provider-skeletons" aria-label="Loading watch options" role="status">
          <span className="watch-skeleton" /><span className="watch-skeleton" /><span className="watch-skeleton" />
        </div>
      ) : hasProviders ? (
        <div className="watch-provider-groups">
          {groups.filter(({ items }) => items.length > 0).map(({ key, label, action, items }) => (
            <section className="watch-provider-group" key={key} aria-labelledby={`watch-${key}-heading`}>
              <h4 id={`watch-${key}-heading`}>{label}</h4>
              <div className="watch-provider-list">
                {items.map((provider) => {
                  const hasLink = isValidUrl(provider.deep_link);
                  const logo = provider.logo_path ? (
                    <img
                      src={provider.logo_path.startsWith('http') ? provider.logo_path : `https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <span className="watch-provider-logo-fallback" aria-hidden="true">
                      {provider.provider_name?.slice(0, 1)}
                    </span>
                  );

                  return hasLink ? (
                    <a
                      className="watch-provider-link"
                      key={`${key}-${provider.provider_id || provider.provider_name}`}
                      href={provider.deep_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${action} ${provider.provider_name} (opens in a new tab)`}
                    >
                      {logo}
                      <span>{action} {provider.provider_name}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <div
                      className="watch-provider-link watch-provider-static"
                      key={`${key}-${provider.provider_id || provider.provider_name}`}
                    >
                      {logo}
                      <span>{action} {provider.provider_name}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p className="watch-empty">No streaming, rental, or purchase options are currently available in {countryName}.</p>
      )}
    </div>
  );
}
