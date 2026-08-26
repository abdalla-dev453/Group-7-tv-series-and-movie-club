import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from './common/Loader.jsx';

const ProtectedRoute = ({ children, requireClubAdmin = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const clubId = location.pathname.split('/')[2];

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireClubAdmin && !user.adminClubIds?.includes(Number(clubId))) {
    return <Navigate to={`/clubs/${clubId}`} replace />;
  }

  return children;
};

export default ProtectedRoute;