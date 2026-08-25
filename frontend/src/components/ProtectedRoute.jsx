import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, requireClubAdmin = false }) => {
  const { user, loading } = useAuth();
  const { id: clubId } = useParams();

  if (loading) {
    return <div className="route-loading" aria-live="polite">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireClubAdmin) {
    const isClubAdmin = user.adminClubIds?.includes(Number(clubId));
    if (!isClubAdmin) {
      return <Navigate to={`/clubs/${clubId}`} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
