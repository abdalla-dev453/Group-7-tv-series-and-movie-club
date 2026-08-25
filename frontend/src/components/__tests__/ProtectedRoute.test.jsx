import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ProtectedRoute from '../ProtectedRoute';
import { useAuth } from '../../context/AuthContext.jsx';

vi.mock('../../context/AuthContext.jsx', () => ({
  useAuth: vi.fn(),
}));

const renderAt = (path, requireClubAdmin = false) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/clubs/:id/manage"
          element={
            <ProtectedRoute requireClubAdmin={requireClubAdmin}>
              <div>Protected content</div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Login page</div>} />
        <Route path="/clubs/:id" element={<div>Club page</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('ProtectedRoute', () => {
  it('shows a loading state while auth is resolving', () => {
    useAuth.mockReturnValue({ user: null, loading: true });
    renderAt('/clubs/1/manage');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('redirects to /login when there is no user', () => {
    useAuth.mockReturnValue({ user: null, loading: false });
    renderAt('/clubs/1/manage');
    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('renders children when a user is present and no admin check is required', () => {
    useAuth.mockReturnValue({ user: { id: 1 }, loading: false });
    renderAt('/clubs/1/manage');
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  it('redirects a non-admin away from a club-admin-only route', () => {
    useAuth.mockReturnValue({ user: { id: 1, adminClubIds: [5] }, loading: false });
    renderAt('/clubs/1/manage', true);
    expect(screen.getByText('Club page')).toBeInTheDocument();
  });

  it('renders children for a user who is admin of that specific club', () => {
    useAuth.mockReturnValue({ user: { id: 1, adminClubIds: [1] }, loading: false });
    renderAt('/clubs/1/manage', true);
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });
});