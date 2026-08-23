import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Redirects to /login if there's no authenticated user.
 * Pass requireClubAdmin to also gate on the current user holding
 * an admin role in club_members for :id in the route — the actual
 * membership check happens server-side too (never trust the client
 * alone for this), this just avoids flashing admin-only UI.
 */
function ProtectedRoute({ children, requireClubAdmin = false }) {
  const { user, loading } = useAuth();
  const { id } = useParams();

  if (loading) return null; // or a spinner

  if (!user) return <Navigate to="/login" replace />;

  if (requireClubAdmin) {
    const isAdmin = user.adminClubIds?.includes(Number(id));
    if (!isAdmin) return <Navigate to={`/clubs/${id}`} replace />;
  }

  return children;
}

export default ProtectedRoute;
