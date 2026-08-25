import { useEffect, useState } from 'react';
import { getFeed } from '../../services/postService.js';
import Loader from '../../components/common/Loader.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import PostCard from '../../components/PostCard.jsx';

const Feed = () => {
  const [state, setState] = useState({ status: 'loading', posts: [], error: null });

  useEffect(() => {
    const controller = new AbortController();
    getFeed(1, 20, controller.signal)
      .then(({ data }) => setState({ status: 'success', posts: Array.isArray(data?.items) ? data.items : [], error: null }))
      .catch((error) => {
        if (error.code !== 'ERR_CANCELED') setState({ status: 'error', posts: [], error });
      });
    return () => controller.abort();
  }, []);

  if (state.status === 'loading') return <Loader />;
  if (state.status === 'error') return <ErrorMessage message="Could not load the feed. Please try again." />;

  return <section className="page-panel">
    <header className="page-heading"><div><p className="eyebrow">Tonight’s conversation</p><h1>What the club is watching.</h1></div><p>Fresh reactions, hard-won recommendations, and no spoilers without a warning.</p></header>
    <div className="feed-grid"><div className="feed-stack">{state.posts.length === 0 ? <EmptyState title="The room is quiet" message="Start the conversation with the film you cannot stop thinking about." /> : state.posts.map((post) => <PostCard key={post.id} post={post} />)}</div><aside className="feed-aside"><p className="eyebrow">Club ritual</p><h3>Take your next watch seriously.</h3><p>Find a room, make a list, and make the post-credit debate count.</p><hr className="mini-rule" /><span className="count">New stories every week</span></aside></div>
  </section>;
};

export default Feed;
