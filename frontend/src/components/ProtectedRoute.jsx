import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from './common/Loader.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;