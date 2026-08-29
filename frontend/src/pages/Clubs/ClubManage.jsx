import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {
  getClubMembers,
  updateMemberRole,
  removeClubMember,
} from '../../services/clubService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

const ClubManage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [state, setState] = useState({
    status: 'loading',
    isAdmin: false,
    members: [],
  });

  const [actionError, setActionError] = useState('');
  const [processingId, setProcessingId] = useState(null);

  const loadMembers = async () => {
    const { data } = await getClubMembers(id);

    const members = Array.isArray(data) ? data : [];

    const currentMembership = members.find(
      (member) => member.user_id === user?.id
    );

    setState({
      status: 'success',
      isAdmin: currentMembership?.role === 'admin',
      members,
    });
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const { data } = await getClubMembers(id);

        if (!mounted) return;

        const members = Array.isArray(data) ? data : [];

        const currentMembership = members.find(
          (member) => member.user_id === user?.id
        );

        setState({
          status: 'success',
          isAdmin: currentMembership?.role === 'admin',
          members,
        });
      } catch (error) {
        if (!mounted) return;

        setState({
          status: 'error',
          isAdmin: false,
          members: [],
        });
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [id, user?.id]);

  const handleRoleChange = async (member) => {
    if (processingId) return;

    const newRole =
      member.role === 'admin' ? 'member' : 'admin';

    setActionError('');
    setProcessingId(member.user_id);

    try {
      await updateMemberRole(
        id,
        member.user_id,
        newRole
      );

      await loadMembers();
    } catch (error) {
      setActionError(
        error.response?.data?.error ||
          'Could not update this member.'
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleRemove = async (member) => {
    if (processingId) return;

    const name =
      member.user?.username ||
      member.username ||
      'this member';

    const confirmed = window.confirm(
      `Remove ${name} from this club?`
    );

    if (!confirmed) return;

    setActionError('');
    setProcessingId(member.user_id);

    try {
      await removeClubMember(id, member.user_id);

      await loadMembers();
    } catch (error) {
      setActionError(
        error.response?.data?.error ||
          'Could not remove this member.'
      );
    } finally {
      setProcessingId(null);
    }
  };

  if (state.status === 'loading') {
    return <Loader />;
  }

  if (state.status === 'error') {
    return (
      <div
        style={{
          marginLeft: '220px',
          minHeight: '100vh',
          padding: '40px',
          boxSizing: 'border-box',
          background: '#0f0f0f',
          color: '#f4efe5',
        }}
      >
        <ErrorMessage message="Could not load club members." />
      </div>
    );
  }

  if (!state.isAdmin) {
    return <Navigate to={`/clubs/${id}`} replace />;
  }

  return (
    <section
      style={{
        marginLeft: '220px',
        width: 'calc(100% - 220px)',
        minHeight: '100vh',
        boxSizing: 'border-box',
        padding: '30px',
        background: '#0f0f0f',
        color: '#f4efe5',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: '25px' }}>
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
            Club administration
          </p>

          <h1
            style={{
              margin: '0 0 8px',
              fontFamily: 'Georgia, serif',
              fontSize: '38px',
            }}
          >
            Manage members
          </h1>

          <p
            style={{
              margin: 0,
              color: '#aaa49a',
            }}
          >
            Add admins, change roles, or remove members
            from your club.
          </p>
        </div>

        {/* ERROR */}
        {actionError && (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px 16px',
              borderRadius: '8px',
              background: '#3a1d1d',
              border: '1px solid #6b3030',
              color: '#ffb4b4',
            }}
          >
            {actionError}
          </div>
        )}

        {/* MEMBERS */}
        <div
          style={{
            background: '#211f18',
            border: '1px solid #3a3528',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '18px 20px',
              borderBottom: '1px solid #3a3528',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 style={{ margin: 0, fontSize: '18px' }}>
              Club Members
            </h2>

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

          {state.members.map((member) => {
            const name =
              member.user?.username ||
              member.username ||
              'Unknown member';

            const isCurrentUser =
              member.user_id === user?.id;

            const isProcessing =
              processingId === member.user_id;

            const isAdmin = member.role === 'admin';

            return (
              <div
                key={member.user_id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  padding: '16px 20px',
                  borderBottom: '1px solid #3a3528',
                  flexWrap: 'wrap',
                }}
              >
                {/* MEMBER */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: '#343126',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffbf1a',
                      fontWeight: 800,
                    }}
                  >
                    {name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '14px',
                      }}
                    >
                      {name}

                      {isCurrentUser && (
                        <span
                          style={{
                            marginLeft: '8px',
                            color: '#aaa49a',
                            fontSize: '11px',
                            fontWeight: 400,
                          }}
                        >
                          You
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        marginTop: '4px',
                        color: isAdmin
                          ? '#ffbf1a'
                          : '#aaa49a',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      {isAdmin ? '★ Admin' : 'Member'}
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                {!isCurrentUser && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() =>
                        handleRoleChange(member)
                      }
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #4a4436',
                        background: 'transparent',
                        color: '#f4efe5',
                        cursor: isProcessing
                          ? 'not-allowed'
                          : 'pointer',
                        fontSize: '12px',
                        opacity: isProcessing ? 0.6 : 1,
                      }}
                    >
                      {isAdmin
                        ? 'Make Member'
                        : 'Make Admin'}
                    </button>

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() =>
                        handleRemove(member)
                      }
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #713535',
                        background: '#351f1f',
                        color: '#ffb4b4',
                        cursor: isProcessing
                          ? 'not-allowed'
                          : 'pointer',
                        fontSize: '12px',
                        opacity: isProcessing ? 0.6 : 1,
                      }}
                    >
                      {isProcessing
                        ? 'Processing...'
                        : 'Remove'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClubManage;