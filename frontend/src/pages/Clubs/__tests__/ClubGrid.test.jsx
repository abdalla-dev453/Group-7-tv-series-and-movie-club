import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import ClubGrid from '../ClubGrid';

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('ClubGrid', () => {
  it('shows a loading message when loading is true', () => {
    renderWithRouter(<ClubGrid clubs={[]} loading />);
    expect(screen.getByText('Loading clubs...')).toBeInTheDocument();
  });

  it('shows an empty state when there are no clubs', () => {
    renderWithRouter(<ClubGrid clubs={[]} loading={false} />);
    expect(screen.getByText('No clubs found.')).toBeInTheDocument();
  });

  it('renders one ClubCard per club', () => {
    const clubs = [
      { id: 1, name: 'Sci-Fi Society', genre: 'Sci-Fi' },
      { id: 2, name: 'Horror Fans', genre: 'Horror' },
    ];
    renderWithRouter(<ClubGrid clubs={clubs} />);
    expect(screen.getByText('Sci-Fi Society')).toBeInTheDocument();
    expect(screen.getByText('Horror Fans')).toBeInTheDocument();
  });
});