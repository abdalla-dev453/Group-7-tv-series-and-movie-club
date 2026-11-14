import { useCallback, useEffect, useState } from 'react';
import { getMovieWatch, getMovieWatchProviders } from './watchApi';
import { getBrowserCountry } from './watchTypes';

export default function useMovieWatch(tmdbId) {
  const [country, setCountryState] = useState(getBrowserCountry);
  const [watchData, setWatchData] = useState(null);
  const [providers, setProviders] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(true);
  const [providersLoading, setProvidersLoading] = useState(true);
  const [trailerError, setTrailerError] = useState(null);
  const [providersError, setProvidersError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  const setCountry = useCallback((nextCountry) => {
    setCountryState(nextCountry);
    try {
      localStorage.setItem('cineclub_watch_region', nextCountry);
    } catch {
      // The selected country remains usable for this session.
    }
  }, []);

  const refetch = useCallback(() => setRetryKey((key) => key + 1), []);

  useEffect(() => {
    if (!tmdbId) return undefined;
    const controller = new AbortController();
    setTrailerLoading(true);
    setTrailerError(null);
    getMovieWatch(tmdbId, { signal: controller.signal })
      .then(({ data }) => setWatchData(data))
      .catch((err) => {
        if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
          setTrailerError('Watch information is temporarily unavailable. Please try again.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setTrailerLoading(false);
      });
    return () => controller.abort();
  }, [tmdbId, retryKey]);

  useEffect(() => {
    if (!tmdbId) return undefined;
    const controller = new AbortController();
    setProvidersLoading(true);
    setProvidersError(null);
    getMovieWatchProviders(tmdbId, country, { signal: controller.signal })
      .then(({ data }) => {
        setProviders(data?.watch_providers || data || null);
      })
      .catch((err) => {
        if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
          setProvidersError('Watch options are temporarily unavailable for this region.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setProvidersLoading(false);
      });
    return () => controller.abort();
  }, [tmdbId, country, retryKey]);

  const error = trailerError || providersError;

  return {
    watchData,
    providers,
    country,
    setCountry,
    trailerLoading,
    providersLoading,
    loading: trailerLoading || providersLoading,
    error,
    trailerError,
    providersError,
    refetch,
  };
}
