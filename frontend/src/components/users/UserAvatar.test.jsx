import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserAvatar from './UserAvatar';

describe('UserAvatar', () => {
  it('renders a fixed-size profile image when an image URL is provided', () => {
    render(<UserAvatar name="Jordan" imageUrl="https://example.com/avatar.png" />);

    const avatar = screen.getByAltText('Jordan profile picture');
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.png');
    expect(avatar).toHaveAttribute('width', '256');
    expect(avatar).toHaveAttribute('height', '256');
  });

  it('falls back to initials when no image is available', () => {
    render(<UserAvatar name="Jordan" />);

    expect(screen.getByText('J')).toBeInTheDocument();
  });
});
