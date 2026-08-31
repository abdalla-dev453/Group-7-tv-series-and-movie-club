import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ClubCreate from "./pages/Clubs/ClubCreate";
import ClubDetail from "./pages/Clubs/ClubDetail";
import ClubList from "./pages/Clubs/ClubList";
import ClubManage from "./pages/Clubs/ClubManage";
import Discover from "./pages/Discover/Discover";
import Feed from "./pages/Feed/Feed";
import Help from "./pages/Help/Help";
import Home from "./pages/Home";
import MovieDetailsPage from "./pages/movies/MovieDetails";
import Movies from "./pages/movies/Movies";
import NotFound from "./pages/NotFound/NotFound";
import CreatePost from "./pages/posts/CreatePost";
import PostDetail from "./pages/posts/PostDetail";
import ProfileEdit from "./pages/Profile/ProfileEdit";
import ProfileView from "./pages/Profile/ProfileView";
import Settings from "./pages/Settings/Settings";
import WatchedList from "./pages/Watched/WatchedList";
function App() {
  return (
    <>
      <Navbar />
      <main className="animate-fade-in-up">
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

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
