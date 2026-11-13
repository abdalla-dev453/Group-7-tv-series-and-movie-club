import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';
import { useAuth } from '../../context/AuthContext';
import { getTrendingMovies } from '../../services/movieService';
import { getClubs, getPublicClubs } from '../../services/clubService';
import { getFeed } from '../../services/postService';

vi.mock('../../context/AuthContext', () => ({ useAuth: vi.fn() }));
vi.mock('../../services/movieService', () => ({ getTrendingMovies: vi.fn() }));
vi.mock('../../services/clubService', () => ({ getClubs: vi.fn(), getPublicClubs: vi.fn() }));
vi.mock('../../services/postService', () => ({ getFeed: vi.fn() }));

const renderHome = () => render(<MemoryRouter><Home /></MemoryRouter>);

describe('Home loading behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    useAuth.mockReturnValue({ user: null });
    getTrendingMovies.mockResolvedValue({ data: { items: [{ tmdb_id: 1, title: 'Fresh Trending Film' }] } });
    getPublicClubs.mockResolvedValue({ data: { items: [] } });
    getClubs.mockResolvedValue({ data: { items: [] } });
    getFeed.mockResolvedValue({ data: { items: [] } });
  });

  it('shows cached trending content immediately while refreshing public data', () => {
    localStorage.setItem('cineclub_home_trending', JSON.stringify({
      items: [{ tmdb_id: 12, title: 'Cached Trending Film' }],
      savedAt: Date.now(),
    }));
    getTrendingMovies.mockReturnValue(new Promise(() => {}));
    getPublicClubs.mockReturnValue(new Promise(() => {}));
    renderHome();
    expect(screen.getByRole('heading', { name: 'Cached Trending Film' })).toBeInTheDocument();
    expect(getTrendingMovies).toHaveBeenCalledTimes(1);
  });

  it('does not refetch trending when the auth state hydrates', async () => {
    let resolvePublicClubs;
    getPublicClubs.mockReturnValue(new Promise((resolve) => { resolvePublicClubs = resolve; }));
    const view = renderHome();
    expect(await screen.findByRole('heading', { name: 'Fresh Trending Film' })).toBeInTheDocument();
    useAuth.mockReturnValue({ user: { id: 4, username: 'filmfan' } });
    view.rerender(<MemoryRouter><Home /></MemoryRouter>);
    expect(getTrendingMovies).toHaveBeenCalledTimes(1);
    expect(getClubs).toHaveBeenCalledTimes(1);
    resolvePublicClubs({ data: { items: [] } });
    await waitFor(() => expect(getFeed).toHaveBeenCalledWith(1, 4));
  });
});
