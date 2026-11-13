import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WatchSection from '../WatchSection';
import { getMovieWatch, getMovieWatchProviders } from '../watchApi';

vi.mock('../watchApi', () => ({
  getMovieWatch: vi.fn(),
  getMovieWatchProviders: vi.fn(),
}));

const trailerResponse = { data: { primary_trailer: { key: 'official123', site: 'YouTube', name: 'Official Trailer' }, videos: [] } };
const providerResponse = { data: { watch_providers: {
  country_code: 'KE',
  stream: [{ provider_id: 8, provider_name: 'Netflix', logo_path: '/netflix.jpg', deep_link: 'https://www.themoviedb.org/movie/123/watch?locale=KE' }],
  rent: [], buy: [],
} } };

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  getMovieWatch.mockResolvedValue(trailerResponse);
  getMovieWatchProviders.mockResolvedValue(providerResponse);
});

describe('WatchSection', () => {
  it('renders an official YouTube trailer after Play trailer is activated', async () => {
    render(<WatchSection tmdbId="123" />);
    const playButton = await screen.findByRole('button', { name: 'Play trailer' });
    fireEvent.click(playButton);
    expect(screen.getByTitle('Official Trailer for this movie')).toHaveAttribute(
      'src', 'https://www.youtube-nocookie.com/embed/official123?autoplay=0&rel=0&modestbranding=1',
    );
    expect(screen.getByRole('link', { name: 'Open trailer on YouTube' })).toHaveAttribute('target', '_blank');
  });

  it('shows the no official trailer message when no video is available', async () => {
    getMovieWatch.mockResolvedValue({ data: { videos: [], primary_trailer: null } });
    render(<WatchSection tmdbId="123" />);
    expect(await screen.findByText('No official trailer is available for this title yet.')).toBeInTheDocument();
  });

  it('shows only non-empty provider groups and links providers in a safe new tab', async () => {
    render(<WatchSection tmdbId="123" />);
    const providerLink = await screen.findByRole('link', { name: 'Watch on Netflix (opens in a new tab)' });
    expect(screen.getByRole('heading', { name: 'Stream' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Rent' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Buy' })).not.toBeInTheDocument();
    expect(providerLink).toHaveAttribute('target', '_blank');
    expect(providerLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(providerLink).toHaveAttribute('href', providerResponse.data.watch_providers.stream[0].deep_link);
  });

  it('refetches providers when the country changes without reloading the trailer', async () => {
    render(<WatchSection tmdbId="123" />);
    await screen.findByRole('link', { name: 'Watch on Netflix (opens in a new tab)' });
    fireEvent.change(screen.getByRole('combobox', { name: 'Choose country for watch options' }), { target: { value: 'US' } });
    await waitFor(() => expect(getMovieWatchProviders).toHaveBeenCalledWith('123', 'US', expect.any(Object)));
    expect(getMovieWatch).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('cineclub_watch_region')).toBe('US');
  });

  it('shows a retry action when the API fails', async () => {
    getMovieWatch.mockRejectedValueOnce(new Error('offline'));
    render(<WatchSection tmdbId="123" />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Watch information is temporarily unavailable. Please try again.');
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    await waitFor(() => expect(getMovieWatch).toHaveBeenCalledTimes(2));
  });

  it('renders skeletons while requests are pending', () => {
    getMovieWatch.mockReturnValue(new Promise(() => {}));
    getMovieWatchProviders.mockReturnValue(new Promise(() => {}));
    render(<WatchSection tmdbId="123" />);
    expect(screen.getByRole('status', { name: 'Loading trailer' })).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Loading watch options' })).toBeInTheDocument();
  });
});
