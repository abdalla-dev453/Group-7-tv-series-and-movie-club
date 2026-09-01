import { useEffect, useState } from 'react';
import { Film, Plus, Trash2, CheckCircle2, AlertCircle, Popcorn, Calendar } from 'lucide-react';
import MovieSearch from '../../components/movies/MovieSearch';
import { deleteWatched, getWatched, logWatched } from '../../services/watchedService';

const getItems = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  return data?.items || data?.results || data?.data || [];
};

const WatchedList = () => {
  const [watched, setWatched] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const showToast = (setter, msg) => {
    setter(msg);
    setTimeout(() => setter(''), 4000);
  };

  useEffect(() => {
    getWatched()
      .then((response) => setWatched(getItems(response)))
      .catch(() => setError('Could not load your watched list.'))
      .finally(() => setLoading(false));
  }, []);

  const addWatched = async () => {
    if (!selected) return;
    setActionLoading(true);
    setError('');
    try {
      const { data } = await logWatched({ movie_title: selected.title });
      setWatched((current) => [data, ...current]);
      setSelected(null);
      showToast(setSuccessMsg, `Added "${selected.title}" to your watched list!`);
    } catch {
      setError('Could not add that title. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const removeWatched = async (item) => {
    setError('');
    try {
      await deleteWatched(item.id);
      setWatched((current) => current.filter((entry) => entry.id !== item.id));
      showToast(setSuccessMsg, `Removed "${item.movie_title}"`);
    } catch {
      setError('Could not remove that title.');
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleGroup}>
            <div style={styles.badgeIcon}><Popcorn size={22} /></div>
            <div>
              <h1 style={styles.title}>Watched History</h1>
              <p style={styles.subtitle}>Track and manage all the films & series you&apos;ve completed.</p>
            </div>
          </div>
          <span style={styles.counter}>{watched.length} {watched.length === 1 ? 'Title' : 'Titles'}</span>
        </div>

        {/* Add Movie Section */}
        <div style={styles.searchCard}>
          <div style={styles.searchRow}>
            <div style={{ flex: 1 }}>
              <MovieSearch onSelect={setSelected} placeholder="Search a title to log..." />
            </div>
            <button
              style={{
                ...styles.addBtn,
                opacity: !selected || actionLoading ? 0.6 : 1,
                cursor: !selected || actionLoading ? 'not-allowed' : 'pointer',
              }}
              type="button"
              disabled={!selected || actionLoading}
              onClick={addWatched}
            >
              <Plus size={18} />
              {actionLoading ? 'Logging...' : 'Log Title'}
            </button>
          </div>

          {selected && (
            <div style={styles.selectedBanner}>
              <CheckCircle2 size={16} color="var(--accent, #e50914)" />
              <span>Ready to add: <strong>{selected.title}</strong></span>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {error && (
          <div style={{ ...styles.toast, ...styles.toastError }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}
        {successMsg && (
          <div style={{ ...styles.toast, ...styles.toastSuccess }}>
            <CheckCircle2 size={18} /> {successMsg}
          </div>
        )}

        {/* Loading / Empty / Grid States */}
        {loading ? (
          <div style={styles.emptyState}>
            <p style={{ color: '#a1a1aa' }}>Loading your log...</p>
          </div>
        ) : watched.length === 0 ? (
          <div style={styles.emptyState}>
            <Film size={44} style={{ color: '#3f3f46', marginBottom: '1rem' }} />
            <h3 style={styles.emptyTitle}>No movies logged yet</h3>
            <p style={styles.emptySub}>Search for a movie or show above to build your viewing list.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {watched.map((item) => (
              <article key={item.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.movieIconBox}>
                    <Film size={18} />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeWatched(item)}
                    style={styles.deleteBtn}
                    aria-label={`Remove ${item.movie_title}`}
                    title="Remove title"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={styles.cardBody}>
                  <strong style={styles.movieTitle}>{item.movie_title}</strong>
                  {item.watched_date && (
                    <span style={styles.dateTag}>
                      <Calendar size={12} /> {item.watched_date}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Clean scoped styles
const styles = {
  section: {
    padding: '3rem 1.5rem',
    color: '#f4f4f5',
    fontFamily: 'Inter, system-ui, sans-serif',
    minHeight: '80vh',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  badgeIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    background: 'rgba(229, 9, 20, 0.15)',
    color: 'var(--accent, #e50914)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(229, 9, 20, 0.3)',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '800',
    margin: 0,
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#a1a1aa',
    margin: '0.2rem 0 0 0',
  },
  counter: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#d4d4d8',
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '0.4rem 0.9rem',
    borderRadius: '20px',
  },
  searchCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '1.25rem',
    marginBottom: '2rem',
  },
  searchRow: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  addBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'var(--accent, #e50914)',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap',
    transition: 'transform 0.2s',
  },
  selectedBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.8rem',
    padding: '0.6rem 0.8rem',
    background: 'rgba(229, 9, 20, 0.08)',
    borderRadius: '8px',
    fontSize: '0.85rem',
    color: '#f4f4f5',
  },
  toast: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.9rem 1.2rem',
    borderRadius: '10px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  toastError: {
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#fca5a5',
  },
  toastSuccess: {
    background: 'rgba(34, 197, 94, 0.15)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    color: '#86efac',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'rgba(255, 255, 255, 0.015)',
    borderRadius: '16px',
    border: '1px dashed rgba(255, 255, 255, 0.1)',
  },
  emptyTitle: {
    margin: '0 0 0.4rem 0',
    fontSize: '1.2rem',
    color: '#fff',
  },
  emptySub: {
    margin: 0,
    color: '#71717a',
    fontSize: '0.9rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.25rem',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '14px',
    padding: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '1rem',
    transition: 'transform 0.2s, border-color 0.2s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieIconBox: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#a1a1aa',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#71717a',
    cursor: 'pointer',
    padding: '0.3rem',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  movieTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#fff',
    lineHeight: '1.3',
  },
  dateTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.78rem',
    color: '#71717a',
  },
};

export default WatchedList;