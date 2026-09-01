import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfile, updateProfile } from '../../services/userService';
import { useAuth } from '../../context/AuthContext.jsx';

const IMAGE_SIZE = 256;

const normalizedImageUrl = (profile = {}) =>
  profile.profile_image_url ||
  profile.profileImageUrl ||
  profile.avatar_url ||
  profile.avatarUrl ||
  profile.image_url ||
  profile.imageUrl ||
  '';

const toSquareImageDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = () => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = IMAGE_SIZE;
      canvas.height = IMAGE_SIZE;

      const scale = Math.max(IMAGE_SIZE / image.width, IMAGE_SIZE / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      const x = (IMAGE_SIZE - width) / 2;
      const y = (IMAGE_SIZE - height) / 2;

      context.fillStyle = '#f5b942';
      context.fillRect(0, 0, IMAGE_SIZE, IMAGE_SIZE);
      context.drawImage(image, x, y, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };

    image.onerror = () => reject(new Error('Unable to read selected image.'));
    image.src = reader.result;
  };

  reader.onerror = () => reject(new Error('Unable to read selected image.'));
  reader.readAsDataURL(file);
});

const ProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateStoredUser } = useAuth();
  const [form, setForm] = useState({ username: '', bio: '', profileImageUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getProfile(id)
      .then(({ data }) => {
        const profile = data?.user || data;
        setForm({
          username: profile.username || '',
          bio: profile.bio || '',
          profileImageUrl: normalizedImageUrl(profile),
        });
      })
      .catch(() => setError('Could not load your profile.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageDataUrl = await toSquareImageDataUrl(file);
      setForm((current) => ({ ...current, profileImageUrl: imageDataUrl }));
    } catch {
      setError('Could not load that image. Please try another photo.');
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        username: form.username,
        bio: form.bio,
        avatar_url: form.profileImageUrl,
        profile_image_url: form.profileImageUrl,
        profileImageUrl: form.profileImageUrl,
      };

      const { data } = await updateProfile(id, payload);
      const updatedProfile = data?.user || data || { ...user, ...payload };
      const nextUser = {
        ...user,
        ...updatedProfile,
        username: form.username,
        bio: form.bio,
        avatar_url: form.profileImageUrl,
        profile_image_url: form.profileImageUrl,
        profileImageUrl: form.profileImageUrl,
      };

      updateStoredUser(nextUser);
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
      <h1 className="profile-form__title">Edit profile</h1>

      <div className="profile-form__header">
        <img
          src={form.profileImageUrl || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="256" height="256" fill="%23f5b942"/><text x="50%" y="54%" text-anchor="middle" fill="%231a1204" font-size="110" font-family="Arial" font-weight="700">' + (form.username || 'U').slice(0, 1).toUpperCase() + '</text></svg>'}
          alt="Profile preview"
          className="profile-form__avatar"
        />
        <small className="profile-form__meta">Fixed 256×256 square photo</small>
      </div>

      <label className="profile-form__field">
        <span>Username</span>
        <input
          value={form.username}
          onChange={(event) => setForm({ ...form, username: event.target.value })}
          required
        />
      </label>

      <label className="profile-form__field profile-form__upload">
        <span>Profile photo</span>
        <div className="profile-form__uploadBox">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <span>{form.profileImageUrl ? 'Replace photo' : 'Choose file'}</span>
        </div>
      </label>

      <label className="profile-form__field">
        <span>Bio</span>
        <textarea
          value={form.bio}
          onChange={(event) => setForm({ ...form, bio: event.target.value })}
          rows="5"
        />
      </label>

      {error && <p className="error-message">{error}</p>}

      <button className="button profile-form__button" type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save profile'}
      </button>
    </form>
  );
};

export default ProfileEdit;
