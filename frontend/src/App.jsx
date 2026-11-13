import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from './context/AuthContext.jsx';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

const Login = lazy(() => import('./pages/Auth/Login'));
const Signup = lazy(() => import('./pages/Auth/Signup'));
const AdminPortal = lazy(() => import('./pages/AdminPortal/aportal'));
const ProfileView = lazy(() => import('./pages/Profile/ProfileView'));
const ProfileEdit = lazy(() => import('./pages/Profile/ProfileEdit'));
const ClubList = lazy(() => import('./pages/Clubs/ClubList'));
const ClubDetail = lazy(() => import('./pages/Clubs/ClubDetail'));
const ClubCreate = lazy(() => import('./pages/Clubs/ClubCreate'));
const ClubManage = lazy(() => import('./pages/Clubs/ClubManage'));
const Feed = lazy(() => import('./pages/Feed/Feed'));
const PostDetail = lazy(() => import('./pages/posts/PostDetail'));
const WatchedList = lazy(() => import('./pages/Watched/WatchedList'));
const CreatePost = lazy(() => import('./pages/posts/CreatePost'));
const Movies = lazy(() => import('./pages/movies/Movies'));
const MovieDetailsPage = lazy(() => import('./pages/movies/MovieDetails'));
import Home from './pages/Home';
const Discover = lazy(() => import('./pages/Discover/Discover'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Help = lazy(() => import('./pages/Help/Help'));
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
        <Suspense fallback={<div className="route-loading" role="status">Loading page…</div>}>
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
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
