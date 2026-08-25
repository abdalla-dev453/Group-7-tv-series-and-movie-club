import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MovieRating from '../MovieRating';

describe('MovieRating', () => {
  it('renders a rating to one decimal place', () => {
    render(<MovieRating rating={8.456} />);
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('renders nothing when rating is null', () => {
    const { container } = render(<MovieRating rating={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
