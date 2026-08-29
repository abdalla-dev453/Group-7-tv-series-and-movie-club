import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClub } from '../../services/clubService.js';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import Button from '../../components/Button.jsx';

const ClubCreate = () => {
  const [form, setForm] = useState({
    name: '',
    genre: '',
    description: '',
  });

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const { data } = await createClub({
        name: form.name.trim(),
        genre: form.genre.trim(),
        description: form.description.trim() || null,
      });

      navigate(`/clubs/${data.id}`, { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          'Could not create the club. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-container">
      <form className="page-panel form-stack" onSubmit={submit}>
        <p className="eyebrow">Open the room</p>

        <h1>Start a proper club.</h1>

        <p>
          Name the obsession. Set the genre. Invite the right people.
        </p>

        {error && <ErrorMessage message={error} />}

        <label>
          <span className="field-label">Club name</span>

          <input
            name="name"
            type="text"
            placeholder="e.g. Midnight Matinee"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span className="field-label">Genre</span>

          <input
            name="genre"
            type="text"
            placeholder="e.g. Psychological thriller"
            value={form.genre}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span className="field-label">Manifesto</span>

          <textarea
            name="description"
            placeholder="What is this room for?"
            value={form.description}
            onChange={handleChange}
            rows={5}
          />
        </label>

        <Button type="submit" disabled={submitting}>
          {submitting ? 'Opening the room…' : 'Create club'}
          <span>→</span>
        </Button>
      </form>
    </main>
  );
};

export default ClubCreate;