import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getClub, getClubMembers } from '../../services/clubService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import ClubMembers from '../../components/clubs/ClubMembers.jsx';
import JoinClubButton from './JoinClubButton.jsx';
import PostCard from '../posts/PostCard.jsx';
import { getFeed } from '../../services/postService.js';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

const ClubDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [state, setState] = useState({ status: 'loading', club: null });
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([getClub(id), getClubMembers(id), getFeed(1, 20, id)])
      .then(([clubResponse, membersResponse, postsResponse]) => {
        setState({ status: 'success', club: clubResponse.data });
        setMembers(Array.isArray(membersResponse.data) ? membersResponse.data : []);
        setPosts(postsResponse.data?.items || []);
      })
      .catch((error) => {
        if (error.code !== 'ERR_CANCELED') setState({ status: error.response?.status === 404 ? 'not-found' : 'error', club: null });
      });
    return () => controller.abort();
  }, [id]);

  if (state.status === 'loading') return <Loader />;
  if (state.status === 'not-found') return <ErrorMessage message="This club no longer exists." />;
  if (state.status === 'error') return <ErrorMessage message="Could not load this club. Please try again." />;

  const membership = members.find((member) => member.user_id === user?.id);
  const updateMembership = (joined) => setMembers((current) => joined
    ? [...current, { user_id: user.id, role: 'member', user: { username: user.username } }]
    : current.filter((member) => member.user_id !== user.id));

  return <section className="page-panel"><p className="eyebrow">{state.club?.genre || 'Film club'}</p><h1>{state.club?.name || 'Club'}</h1><p>{state.club?.description || 'A good room makes every watch better.'}</p><div className="form-stack"><JoinClubButton clubId={id} isMember={Boolean(membership)} isAdmin={membership?.role === 'admin'} onMembershipChange={updateMembership} />{membership ? <Link className="button" to="/posts/new" state={{ clubId: Number(id) }}>Start a conversation</Link> : <p className="muted">Join this club to start a conversation.</p>}</div><h2>Members ({members.length})</h2><ClubMembers members={members} /><h2>Conversation</h2>{posts.length ? <div className="feed-list">{posts.map((post) => <PostCard key={post.id} post={post} />)}</div> : <p className="muted">No conversations yet. Join the club to start the first one.</p>}</section>;
};

export default ClubDetail;
