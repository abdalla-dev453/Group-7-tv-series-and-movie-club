import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const name = user?.username || 'film fan';

  return (
    <main className="home-page">
      <section className="home-hero">
        <div>
          <p className="eyebrow">Your watch-world, together</p>
          <h1>Welcome back, {name}.</h1>
          <p className="home-intro">A place for people who watch deeply, discuss freely, and always have one more recommendation.</p>
        </div>
        <Link className="button" to={user ? '/clubs' : '/signup'}>{user ? 'Explore clubs' : 'Join the club'}</Link>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div><p className="eyebrow">Make it yours</p><h2>Quick actions</h2></div>
        </div>
        <div className="action-grid">
          <Link className="action-card" to={user ? '/clubs/new' : '/signup'}><strong>Start a club</strong><span>Bring your next obsession together.</span></Link>
          <Link className="action-card" to={user ? '/watched' : '/signup'}><strong>Track what you watch</strong><span>Keep your viewing history close.</span></Link>
          <Link className="action-card" to={user ? '/clubs' : '/login'}><strong>Find a conversation</strong><span>There is always room for one more opinion.</span></Link>
        </div>
      </section>

      <section className="home-section home-columns">
        <div className="home-panel"><p className="eyebrow">Community pulse</p><h2>Recent activity</h2><p className="empty-copy">{user ? 'Your feed will fill up as clubs and friends start sharing.' : 'Sign in to see what your movie people are talking about.'}</p><Link to={user ? '/' : '/login'} className="text-link">{user ? 'Open your feed' : 'Log in'}</Link></div>
        <div className="home-panel home-panel--accent"><p className="eyebrow">A good next step</p><h2>Meet your movie people.</h2><p className="empty-copy">Join a club built around the shows and films you cannot stop talking about.</p><Link to={user ? '/clubs' : '/signup'} className="text-link">{user ? 'Browse clubs' : 'Create an account'}</Link></div>
      </section>
    </main>
  );
};

export default Home;
