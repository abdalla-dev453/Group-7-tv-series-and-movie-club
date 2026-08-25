import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import PostCard from '../PostCard';

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('PostCard', () => {
  it('renders the movie title and author', () => {
    renderWithRouter(
      <PostCard post={{ id: 1, movieTitle: 'Dune: Part Two', author: { username: 'alex' }, body: 'Loved it.' }} />
    );
    expect(screen.getAllByText('Dune: Part Two').length).toBeGreaterThan(0);
    expect(screen.getByText(/@alex/)).toBeInTheDocument();
  });

  it('falls back gracefully when post fields are missing', () => {
    renderWithRouter(<PostCard post={{}} />);
    expect(screen.getByText('Untitled post')).toBeInTheDocument();
    expect(screen.getByText(/@Anonymous/)).toBeInTheDocument();
  });
});
