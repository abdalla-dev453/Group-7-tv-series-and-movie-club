import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfile, updateProfile } from '../../services/userService';

const ProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getProfile(id)
      .then(({ data }) => {
        const profile = data?.user || data;
        setForm({ username: profile.username || '', bio: profile.bio || '' });
      })
      .catch(() => setError('Could not load your profile.'))
      .finally(() => setLoading(false));
  }, [id]);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updateProfile(id, form);
      navigate(`/profile/${id}`);
    } catch {
      setError('Could not save your profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <section className="page-panel"><p className="muted">Loading profile...</p></section>;
  return (
    <form className="page-panel profile-form" onSubmit={submit}>
      <h1>Edit profile</h1>
      <label>Username<input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} required /></label>
      <label>Bio<textarea value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} rows="4" /></label>
      {error && <p className="error-message">{error}</p>}
      <button className="button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save profile'}</button>
    </form>
  );
};

export default ProfileEdit;
