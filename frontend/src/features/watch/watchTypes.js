export const WATCH_COUNTRIES = [
  { code: 'KE', name: 'Kenya' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'IN', name: 'India' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'AU', name: 'Australia' },
];

export const getBrowserCountry = () => {
  try {
    const savedCountry = localStorage.getItem('cineclub_watch_region');
    if (WATCH_COUNTRIES.some(({ code }) => code === savedCountry)) return savedCountry;
  } catch {
    // Storage can be unavailable in restricted browser contexts.
  }

  const locale = navigator.languages?.[0] || navigator.language;
  const localeCountry = locale?.match(/[-_]([a-z]{2})$/i)?.[1]?.toUpperCase();
  return WATCH_COUNTRIES.some(({ code }) => code === localeCountry) ? localeCountry : 'KE';
};
