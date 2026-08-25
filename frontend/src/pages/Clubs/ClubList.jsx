import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ClubGrid from '../../components/clubs/ClubGrid';
import { getClubs } from '../../services/clubService';
import './ClubList.css';

const ClubList = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadClubs = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getClubs();

      const data =
        response.data?.clubs ??
        response.data ??
        [];

      setClubs(
        Array.isArray(data)
          ? data
          : data.items ?? []
      );
    } catch (err) {
      console.error('Failed to load clubs:', err);
      setError('Unable to load clubs right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClubs();
  }, []);

  return (
    <main className="clubs-page">
      <header className="clubs-page__header">
        <div>
          <span className="clubs-page__eyebrow">
            COMMUNITY
          </span>

          <h1>Find your club.</h1>

          <p>
            Join communities built around the movies
            and TV shows you love.
          </p>
        </div>

        <Link
          to="/clubs/new"
          className="button button--primary"
        >
          + Create Club
        </Link>
      </header>

      <ClubGrid
        clubs={clubs}
        loading={loading}
        error={error}
        onMembershipChange={loadClubs}
      />
    </main>
  );
};

export default ClubList;
