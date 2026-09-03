import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import PostCard from '../posts/PostCard';
import { getFeed } from '../../services/postService';

const getItems = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  return data?.items || data?.results || data?.data || [];
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getFeed()
      .then((response) => active && setPosts(getItems(response)))
      .catch(() => active && setError('Could not load the community feed.'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return (
    <section className="page-panel feed-page">
      <div className="feed-heading">
        <div>
          <p className="section-kicker">Community</p>
          <h1>Feed</h1>
          <p>See what the CineClub community is watching.</p>
        </div>
        <Link to="/posts/new" className="button feed-button">
          <Plus size={16} />
          Share what you watched
        </Link>
      </div>
      {loading && <p className="muted">Loading posts...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && posts.length === 0 && <p className="muted">No posts yet. Start the conversation.</p>}
      <div className="feed-list">{posts.map((post) => <PostCard key={post.id} post={post} />)}</div>
    </section>
  );
};

export default Feed;
