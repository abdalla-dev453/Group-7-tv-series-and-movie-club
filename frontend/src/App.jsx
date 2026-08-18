import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Auth/Login.jsx';
import Signup from './pages/Auth/Signup.jsx';
import ProfileView from './pages/Profile/ProfileView.jsx';
import ProfileEdit from './pages/Profile/ProfileEdit.jsx';
import ClubList from './pages/Clubs/ClubList.jsx';
import ClubDetail from './pages/Clubs/ClubDetail.jsx';
import ClubCreate from './pages/Clubs/ClubCreate.jsx';
import ClubManage from './pages/Clubs/ClubManage.jsx';
import Feed from './pages/Feed/Feed.jsx';
import PostDetail from './pages/Feed/PostDetail.jsx';
import WatchedList from './pages/Watched/WatchedList.jsx';

const App = () => (
  <div className="app-shell">
    <div className="main-panel">
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/clubs" element={<ClubList />} />
          <Route path="/clubs/:id" element={<ClubDetail />} />
          <Route path="/clubs/create" element={<ProtectedRoute><ClubCreate /></ProtectedRoute>} />
          <Route path="/clubs/:id/manage" element={<ProtectedRoute><ClubManage /></ProtectedRoute>} />
          <Route path="/watched" element={<ProtectedRoute><WatchedList /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/feed" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </div>
);

export default App;
