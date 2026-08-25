import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
import PostDetail from './pages/Feed/PostDetail';
import WatchedList from './pages/Watched/WatchedList';

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
          <Route path="/" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/posts/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
          <Route path="/clubs" element={<ProtectedRoute><ClubList /></ProtectedRoute>} />
          <Route path="/clubs/new" element={<ProtectedRoute><ClubCreate /></ProtectedRoute>} />
          <Route path="/clubs/:id" element={<ProtectedRoute><ClubDetail /></ProtectedRoute>} />
          <Route path="/clubs/:id/manage" element={<ProtectedRoute><ClubManage /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
          <Route path="/profile/:id/edit" element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>} />
          <Route path="/watched" element={<ProtectedRoute><WatchedList /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
