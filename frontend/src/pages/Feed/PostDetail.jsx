import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../../services/postService.js';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import PostCard from '../../components/PostCard.jsx';

const PostDetail = () => {
  const { id } = useParams();
  const [state, setState] = useState({ status: 'loading', post: null });
  useEffect(() => {
    const controller = new AbortController();
    getPost(id, controller.signal).then(({ data }) => setState({ status: 'success', post: data })).catch((error) => {
      if (error.code !== 'ERR_CANCELED') setState({ status: error.response?.status === 404 ? 'not-found' : 'error', post: null });
    });
    return () => controller.abort();
  }, [id]);
  if (state.status === 'loading') return <Loader />;
  if (state.status === 'not-found') return <ErrorMessage message="This post no longer exists." />;
  if (state.status === 'error') return <ErrorMessage message="Could not load this post. Please try again." />;
  return <section className="page-panel"><PostCard post={state.post} /></section>;
};

export default PostDetail;
