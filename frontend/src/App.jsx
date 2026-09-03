import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from './context/AuthContext.jsx';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import AdminPortal from './pages/AdminPortal/aportal';
import ProfileView from './pages/Profile/ProfileView';
import ProfileEdit from './pages/Profile/ProfileEdit';
import ClubList from './pages/Clubs/ClubList';
import ClubDetail from './pages/Clubs/ClubDetail';
import ClubCreate from './pages/Clubs/ClubCreate';
import ClubManage from './pages/Clubs/ClubManage';
import Feed from './pages/Feed/Feed';
import PostDetail from './pages/posts/PostDetail';
import WatchedList from './pages/Watched/WatchedList';
import CreatePost from './pages/posts/CreatePost';
import Movies from './pages/movies/Movies';
import MovieDetailsPage from './pages/movies/MovieDetails';
import Home from './pages/Home';
import Discover from './pages/Discover/Discover';
import NotFound from './pages/NotFound/NotFound';
import Settings from './pages/Settings/Settings';
import Help from './pages/Help/Help';
import './App.css';

function AuthOnlyRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <>
      <Navbar />
      <main className="animate-fade-in-up">
        <Routes>
          {/* Public */}
          <Route path="/login" element={<AuthOnlyRoute><Login /></AuthOnlyRoute>} />
          <Route path="/signup" element={<AuthOnlyRoute><Signup /></AuthOnlyRoute>} />
          
            
         {/* New admin route for admin-portal. */}

          {/* Admin-only */}
          {/* <Route path="/admin-portal"  element={ <AdminRoute><AdminPortal /> </AdminRoute>}/> */}

          {/* Protected */}
          <Route path="/" element={<Home />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
            />
            
            <Route
            path="/admin-portal"
            element={
            <AdminRoute>
              <AdminPortal />
            </AdminRoute>
                }
          />
          
          <Route
            path="/posts/:id"
            element={
              <ProtectedRoute>
                <PostDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/new"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discover"
            element={
              <ProtectedRoute>
                <Discover />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:tmdbId"
            element={
              <ProtectedRoute>
                <MovieDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clubs"
            element={
              <ProtectedRoute>
                <ClubList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clubs/new"
            element={
              <ProtectedRoute>
                <ClubCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clubs/:id"
            element={
              <ProtectedRoute>
                <ClubDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clubs/:id/manage"
            element={
              <ProtectedRoute>
                <ClubManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <ProfileView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id/edit"
            element={
              <ProtectedRoute>
                <ProfileEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watched"
            element={
              <ProtectedRoute>
                <WatchedList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
