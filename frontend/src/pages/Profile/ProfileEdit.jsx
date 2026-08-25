import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { updateProfile } from '../../services/userService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import Button from '../../components/Button.jsx';

const ProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateStoredUser } = useAuth();
  const [form, setForm] = useState({ bio: '', avatarUrl: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm({ bio: user?.bio || '', avatarUrl: user?.avatar_url || '' });
  }, [user]);

  if (!user || Number(id) !== user.id) return <Navigate to={`/profile/${id}`} replace />;

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const { data } = await updateProfile(id, { bio: form.bio.trim() || null, avatar_url: form.avatarUrl.trim() || null });
      updateStoredUser(data);
      navigate(`/profile/${id}`, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Could not update your profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return <form className="page-panel" onSubmit={submit}><h1>Edit profile</h1>{error && <ErrorMessage message={error} />}<textarea placeholder="Bio" value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} /><input type="url" placeholder="Avatar URL" value={form.avatarUrl} onChange={(event) => setForm({ ...form, avatarUrl: event.target.value })} /><Button type="submit" disabled={submitting}>{submitting ? 'Saving…' : 'Save profile'}</Button></form>;
};

export default ProfileEdit;
