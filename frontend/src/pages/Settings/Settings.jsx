import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileId = user?.id || user?.user_id;

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <section className="page-panel utility-page">
      <p className="eyebrow">Your account</p>
      <h1>Settings</h1>
      <p className="utility-intro">Manage your CineClub account preferences and activity.</p>
      <div className="settings-list">
        <Link className="settings-row" to={`/profile/${profileId}/edit`}>
          <div><strong>Account management</strong><span>Update your profile details and preferences.</span></div><span aria-hidden="true">›</span>
        </Link>
        <Link className="settings-row" to="/watched">
          <div><strong>Activity and content</strong><span>Review your watched titles and community posts.</span></div><span aria-hidden="true">›</span>
        </Link>
        <Link className="settings-row" to="/feed">
          <div><strong>Community activity</strong><span>Open your feed and continue the conversation.</span></div><span aria-hidden="true">›</span>
        </Link>
        <div className="settings-row settings-row--danger">
          <div><strong>Session</strong><span>Sign out of this device.</span></div>
          <button type="button" onClick={signOut}>Log out</button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
