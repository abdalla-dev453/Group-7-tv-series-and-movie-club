import { Link } from 'react-router-dom';

const Feed = () => (
  <section className="page-panel">
    <h1>Feed</h1>
    <Link to="/posts/new" style={{ color: 'var(--amber)' }}>+ Share what you watched</Link>
    <p>Community activity and posts appear here.</p>
  </section>
);

export default Feed;
