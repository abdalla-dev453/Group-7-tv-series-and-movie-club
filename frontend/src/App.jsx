import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
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

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/posts/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
          <Route path="/posts/new" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
          <Route path="/movies/:tmdbId" element={<ProtectedRoute><MovieDetailsPage /></ProtectedRoute>} />
          <Route path="/clubs" element={<ProtectedRoute><ClubList /></ProtectedRoute>} />
          <Route path="/clubs/new" element={<ProtectedRoute><ClubCreate /></ProtectedRoute>} />
          <Route path="/clubs/:id" element={<ProtectedRoute><ClubDetail /></ProtectedRoute>} />
          <Route path="/clubs/:id/manage" element={<ProtectedRoute requireClubAdmin><ClubManage /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
          <Route path="/profile/:id/edit" element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>} />
          <Route path="/watched" element={<ProtectedRoute><WatchedList /></ProtectedRoute>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
