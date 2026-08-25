import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import JoinClubButton from '../JoinClubButton';
import * as clubService from '../../../services/clubService';

vi.mock('../../../services/clubService');

describe('JoinClubButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows "Club Admin" and is disabled when isAdmin is true', () => {
    render(<JoinClubButton clubId={1} isAdmin />);
    const button = screen.getByRole('button', { name: 'Club Admin' });
    expect(button).toBeDisabled();
  });

  it('shows "Join Club" when not a member, and calls joinClub on click', async () => {
    clubService.joinClub.mockResolvedValue({});
    const onChange = vi.fn();
    render(<JoinClubButton clubId={1} isMember={false} onMembershipChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Join Club' }));

    await waitFor(() => expect(clubService.joinClub).toHaveBeenCalledWith(1));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(await screen.findByRole('button', { name: /Joined/ })).toBeInTheDocument();
  });

  it('shows "Joined" when already a member, and calls leaveClub on click', async () => {
    clubService.leaveClub.mockResolvedValue({});
    const onChange = vi.fn();
    render(<JoinClubButton clubId={1} isMember onMembershipChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /Joined/ }));

    await waitFor(() => expect(clubService.leaveClub).toHaveBeenCalledWith(1));
    expect(onChange).toHaveBeenCalledWith(false);
    expect(await screen.findByRole('button', { name: 'Join Club' })).toBeInTheDocument();
  });

  it('does not call the API when clicked with no clubId', () => {
    render(<JoinClubButton clubId={null} />);
    fireEvent.click(screen.getByRole('button'));
    expect(clubService.joinClub).not.toHaveBeenCalled();
    expect(clubService.leaveClub).not.toHaveBeenCalled();
  });

  it('logs an error and stays in its previous state when the API call fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    clubService.joinClub.mockRejectedValue(new Error('network error'));

    render(<JoinClubButton clubId={1} isMember={false} />);
    fireEvent.click(screen.getByRole('button', { name: 'Join Club' }));

    await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
    expect(screen.getByRole('button', { name: 'Join Club' })).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});