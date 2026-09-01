import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getClub,
  getClubMembers,
  joinClub,
  leaveClub,
} from '../../services/clubService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

const ClubDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [state, setState] = useState({
    status: 'loading',
    club: null,
    members: [],
    isMember: false,
    isAdmin: false,
  });

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  const loadClub = async () => {
    const [clubResponse, membersResponse] = await Promise.all([
      getClub(id),
      getClubMembers(id),
    ]);

    const club = clubResponse.data;

    const members = Array.isArray(membersResponse.data)
      ? membersResponse.data
      : [];

    const currentMember = members.find(
      (member) => member.user_id === user?.id
    );

    setState({
      status: 'success',
      club,
      members,
      isMember: Boolean(currentMember),
      isAdmin: currentMember?.role === 'admin',
    });
  };

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const [clubResponse, membersResponse] = await Promise.all([
          getClub(id),
          getClubMembers(id),
        ]);

        if (!active) return;

        const club = clubResponse.data;

        const members = Array.isArray(membersResponse.data)
          ? membersResponse.data
          : [];

        const currentMember = members.find(
          (member) => member.user_id === user?.id
        );

        setState({
          status: 'success',
          club,
          members,
          isMember: Boolean(currentMember),
          isAdmin: currentMember?.role === 'admin',
        });
      } catch (error) {
        if (!active) return;

        setState({
          status:
            error.response?.status === 404
              ? 'not-found'
              : 'error',
          club: null,
          members: [],
          isMember: false,
          isAdmin: false,
        });
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [id, user?.id]);

  const handleJoin = async () => {
    if (actionLoading) return;

    setActionLoading(true);
    setActionError('');

    try {
      await joinClub(id);
      await loadClub();
    } catch (error) {
      setActionError(
        error.response?.data?.error ||
          'Could not join this club.'
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeave = async () => {
    if (actionLoading) return;

    const confirmed = window.confirm(
      'Are you sure you want to leave this club?'
    );

    if (!confirmed) return;

    setActionLoading(true);
    setActionError('');

    try {
      await leaveClub(id);
      await loadClub();
    } catch (error) {
      setActionError(
        error.response?.data?.error ||
          'Could not leave this club.'
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (state.status === 'loading') {
    return <Loader />;
  }

  if (state.status === 'not-found') {
    return (
      <div
        style={{
          marginLeft: '80px',
          minHeight: '100vh',
          padding: '40px',
          boxSizing: 'border-box',
          background: '#0f0f0f',
          color: '#f4efe5',
        }}
      >
        <ErrorMessage message="This club no longer exists." />
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div
        style={{
          marginLeft: '80px',
          minHeight: '100vh',
          padding: '40px',
          boxSizing: 'border-box',
          background: '#0f0f0f',
          color: '#f4efe5',
        }}
      >
        <ErrorMessage message="Could not load this club. Please try again." />
      </div>
    );
  }

  const clubBanner = state.club?.background_url || state.club?.cover_image || state.club?.coverImage || '';

  return (
    <div
      style={{
        marginLeft: '80px',
        width: 'calc(100% - 80px)',
        minHeight: '100vh',
        boxSizing: 'border-box',
        padding: '24px',
        background: '#0f0f0f',
        color: '#f4efe5',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* CLUB HEADER */}
        <section
          style={{
            background: clubBanner
              ? `linear-gradient(135deg, rgba(9,9,11,0.72), rgba(9,9,11,0.82)), url("${clubBanner}") center center / cover no-repeat`
              : '#211f18',
            border: '1px solid #3a3528',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '20px',
            minHeight: '260px',
            display: 'flex',
            alignItems: 'flex-end',
            backgroundColor: '#181611',
            boxShadow: clubBanner ? 'inset 0 0 0 1px rgba(255,255,255,0.04)' : 'none',
          }}
        >
          <p
            style={{
              margin: '0 0 8px',
              color: '#ffbf1a',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}
          >
            {state.club?.genre || 'Film club'}
          </p>

          <h1
            style={{
              margin: '0 0 12px',
              fontFamily: 'Georgia, serif',
              fontSize: '42px',
              lineHeight: 1.1,
            }}
          >
            {state.club?.name || 'Club'}
          </h1>

          <p
            style={{
              margin: '0 0 22px',
              maxWidth: '700px',
              color: '#aaa49a',
              lineHeight: 1.7,
            }}
          >
            {state.club?.description ||
              'A good room makes every watch better.'}
          </p>

          {/* ACTIONS */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            {!state.isMember && (
              <button
                type="button"
                onClick={handleJoin}
                disabled={actionLoading}
                style={{
                  background: '#ffbf1a',
                  color: '#181207',
                  border: 'none',
                  borderRadius: '7px',
                  padding: '11px 20px',
                  fontWeight: 700,
                  cursor: actionLoading
                    ? 'not-allowed'
                    : 'pointer',
                  opacity: actionLoading ? 0.6 : 1,
                }}
              >
                {actionLoading ? 'Joining...' : 'Join Club'}
              </button>
            )}

            {state.isMember && !state.isAdmin && (
              <button
                type="button"
                onClick={handleLeave}
                disabled={actionLoading}
                style={{
                  background: 'transparent',
                  color: '#f4efe5',
                  border: '1px solid #4a4436',
                  borderRadius: '7px',
                  padding: '10px 18px',
                  fontWeight: 700,
                  cursor: actionLoading
                    ? 'not-allowed'
                    : 'pointer',
                  opacity: actionLoading ? 0.6 : 1,
                }}
              >
                {actionLoading ? 'Leaving...' : 'Leave Club'}
              </button>
            )}

            {state.isMember && (
              <Link
                to={`/posts/new?club=${id}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  background: '#ffbf1a',
                  color: '#181207',
                  borderRadius: '7px',
                  padding: '10px 18px',
                  fontWeight: 700,
                  fontSize: '13px',
                }}
              >
                Start a conversation
              </Link>
            )}

            {state.isAdmin && (
              <>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderRadius: '7px',
                    background: '#352d18',
                    color: '#ffbf1a',
                    border: '1px solid #5b4b20',
                    fontSize: '13px',
                    fontWeight: 700,
                  }}
                >
                  ★ Club Admin
                </span>

                <Link
                  to={`/clubs/${id}/manage`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    background: '#ffbf1a',
                    color: '#181207',
                    borderRadius: '7px',
                    padding: '10px 18px',
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  Manage Club →
                </Link>
              </>
            )}
          </div>

          {actionError && (
            <div
              style={{
                marginTop: '18px',
                padding: '12px 15px',
                borderRadius: '7px',
                background: '#351f1f',
                border: '1px solid #713535',
                color: '#ffb4b4',
                fontSize: '13px',
              }}
            >
              {actionError}
            </div>
          )}
        </section>

        {/* MEMBERS */}
        <section
          style={{
            background: '#211f18',
            border: '1px solid #3a3528',
            borderRadius: '12px',
            padding: '22px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px',
            }}
          >
            <div>
              <p
                style={{
                  margin: '0 0 5px',
                  color: '#ffbf1a',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Community
              </p>

              <h2
                style={{
                  margin: 0,
                  fontSize: '20px',
                }}
              >
                Club Members
              </h2>
            </div>

            <span
              style={{
                color: '#aaa49a',
                fontSize: '13px',
              }}
            >
              {state.members.length}{' '}
              {state.members.length === 1
                ? 'member'
                : 'members'}
            </span>
          </div>

          {state.members.length === 0 ? (
            <p
              style={{
                margin: 0,
                padding: '30px',
                textAlign: 'center',
                color: '#aaa49a',
              }}
            >
              No members yet. Be the first to join.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fill, minmax(230px, 1fr))',
                gap: '12px',
              }}
            >
              {state.members.map((member) => {
                const name =
                  member.user?.username ||
                  member.username ||
                  'Member';

                const isAdmin = member.role === 'admin';

                return (
                  <div
                    key={member.user_id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px',
                      background: '#29271f',
                      border: '1px solid #3a3528',
                      borderRadius: '9px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#343126',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffbf1a',
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {name.charAt(0).toUpperCase()}
                    </div>

                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {name}
                      </div>

                      <div
                        style={{
                          marginTop: '4px',
                          color: isAdmin
                            ? '#ffbf1a'
                            : '#aaa49a',
                          fontSize: '10px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                        }}
                      >
                        {isAdmin ? '★ Admin' : 'Member'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ClubDetail;