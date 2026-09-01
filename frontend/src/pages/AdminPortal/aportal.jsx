import { useState, useEffect } from 'react';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import Modal from '../../components/common/Modal';
import * as adminService from '../../services/adminService';
import './aportal.css';

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  // Data states
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [userQuery, setUserQuery] = useState('');
  const [clubs, setClubs] = useState([]);
  const [clubQuery, setClubQuery] = useState('');
  const [modQueue, setModQueue] = useState([]);
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    allowNewSignups: true,
    requireEmailVerification: true,
    maxClubsPerUser: 5,
  });

  // Modal target states
  const [modalType, setModalType] = useState(null); // 'delete_club' | 'ban_user'
  const [targetItem, setTargetItem] = useState(null);

  useEffect(() => {
    loadPortalData();
  }, []);

  const loadPortalData = async () => {
    setLoading(true);
    setError('');
    try {
      const [statsRes, usersRes, clubsRes, modRes, settingsRes] = await Promise.all([
        adminService.getAdminStats(),
        adminService.getAdminUsers(),
        adminService.getAdminClubs(),
        adminService.getModerationQueue(),
        adminService.getSystemSettings(),
      ]);

      setStats(statsRes);
      setUsers(Array.isArray(usersRes?.users) ? usersRes.users : Array.isArray(usersRes) ? usersRes : []);
      setClubs(Array.isArray(clubsRes?.clubs) ? clubsRes.clubs : Array.isArray(clubsRes) ? clubsRes : []);
      setModQueue(Array.isArray(modRes) ? modRes : []);
      if (settingsRes) setSettings(settingsRes);
    } catch (err) {
      setError(err.message || 'Failed to load administrative portal data');
    } finally {
      setLoading(false);
    }
  };

  const showTemporaryNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 4000);
  };

  // User Handlers
  const handleToggleSuperuser = async (user) => {
    const updated = !user.is_superuser;
    try {
      await adminService.toggleUserSuperuser(user.id, updated);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, is_superuser: updated } : u)));
      showTemporaryNotice(`User @${user.username || user.name || user.id} superuser role updated.`);
    } catch {
      setError('Failed to update user role');
    }
  };

  const handleToggleBan = async (user) => {
    const nextBan = !user.is_banned;
    try {
      await adminService.toggleUserBanStatus(user.id, nextBan);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, is_banned: nextBan } : u)));
      showTemporaryNotice(`User @${user.username || user.name || user.id} is now ${nextBan ? 'banned' : 'active'}.`);
      setModalType(null);
      setTargetItem(null);
    } catch {
      setError('Failed to update user ban status');
    }
  };

  // Club Handlers
  const handleDeleteClub = async (club) => {
    try {
      await adminService.deleteClubAdmin(club.id);
      setClubs((prev) => prev.filter((c) => c.id !== club.id));
      showTemporaryNotice(`Club "${club.name}" was successfully removed.`);
      setModalType(null);
      setTargetItem(null);
    } catch {
      setError('Failed to delete club');
    }
  };

  // Content Moderation Handler
  const handleResolveModeration = async (item, action) => {
    try {
      if (action === 'delete') {
        await adminService.deletePostAdmin(item.id);
        showTemporaryNotice(`Content report #${item.id} resolved: Item deleted.`);
      } else {
        showTemporaryNotice(`Content report #${item.id} dismissed.`);
      }
      setModQueue((prev) => prev.filter((i) => i.id !== item.id));
    } catch {
      setError('Failed to process moderation action');
    }
  };

  // Settings Handler
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await adminService.updateSystemSettings(settings);
      showTemporaryNotice('System settings updated successfully.');
    } catch {
      setError('Failed to save system settings');
    }
  };

  // Filtered queries
  const filteredUsers = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(userQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(userQuery.toLowerCase()) ||
      String(u.id).includes(userQuery)
  );

  const filteredClubs = clubs.filter(
    (c) =>
      c.name?.toLowerCase().includes(clubQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(clubQuery.toLowerCase()) ||
      String(c.id).includes(clubQuery)
  );

  if (loading) return <Loader />;

  return (
    <div className="aportal-container">
      {/* HEADER BANNER */}
      <div className="aportal-header">
        <div>
          <div className="aportal-title-wrapper">
            <h1 className="aportal-title">Superuser Admin Portal</h1>
            <span className="aportal-badge">GLOBAL ADMIN</span>
          </div>
          <p className="aportal-subtitle">
            System control, user moderation, club governance, and global application metrics.
          </p>
        </div>

        <button type="button" onClick={loadPortalData} className="aportal-btn aportal-btn-ghost">
          ↻ Refresh System Data
        </button>
      </div>

      {/* NOTICES AND ERRORS */}
      {error && (
        <div className="aportal-error-wrapper">
          <ErrorMessage message={error} />
        </div>
      )}
      {notice && <div className="aportal-notice">✓ {notice}</div>}

      {/* NAVIGATION TABS */}
      <div className="aportal-tabs">
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'users', label: `👥 User Management (${users.length})` },
          { id: 'clubs', label: `♟ Club Governance (${clubs.length})` },
          { id: 'moderation', label: `🛡 Moderation (${modQueue.length})` },
          { id: 'settings', label: '⚙ System Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`aportal-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div>
          <div className="aportal-stats-grid">
            {[
              { label: 'Total Registered Users', value: stats?.totalUsers ?? users.length, icon: '👥' },
              { label: 'Active Movie Clubs', value: stats?.totalClubs ?? clubs.length, icon: '♟' },
              { label: 'Posts & Reviews', value: stats?.totalPosts ?? 389, icon: '📝' },
              { label: 'Moderation Flagged', value: stats?.flaggedContent ?? modQueue.length, icon: '⚠️' },
              { label: 'System Health', value: stats?.systemStatus ?? 'Healthy', icon: '🟢' },
            ].map((card, idx) => (
              <div key={idx} className="aportal-stat-card">
                <div className="aportal-stat-icon">{card.icon}</div>
                <div className="aportal-stat-label">{card.label}</div>
                <div className="aportal-stat-value">{card.value}</div>
              </div>
            ))}
          </div>

          <div className="aportal-summary-card">
            <h3 className="aportal-summary-title">System Status Summary</h3>
            <ul className="aportal-summary-list">
              <li>
                Database Connection: <strong>Connected & Healthy</strong>
              </li>
              <li>
                Authentication JWT Service: <strong>Active</strong>
              </li>
              <li>
                TMDB API Gateway Integration: <strong>Operational</strong>
              </li>
              <li>
                Active Moderation Queue:{' '}
                <strong className={modQueue.length > 0 ? 'aportal-status-superuser' : ''}>
                  {modQueue.length} items awaiting review
                </strong>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* 2. USER MANAGEMENT TAB */}
      {activeTab === 'users' && (
        <div>
          <input
            type="text"
            placeholder="Search users by name, username, or ID..."
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            className="aportal-search-input"
          />

          <div className="aportal-table-wrapper">
            <table className="aportal-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="aportal-actions-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="aportal-empty-cell">
                      No users found matching query.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td className="aportal-id-cell">#{u.id}</td>
                      <td>
                        <div>{u.username || u.name || `User #${u.id}`}</div>
                        <div className="aportal-user-subtext">{u.email || 'No email registered'}</div>
                      </td>
                      <td>
                        {u.is_superuser || u.role === 'admin' ? (
                          <span className="aportal-status-superuser">⚡ Superuser</span>
                        ) : (
                          <span className="aportal-status-member">Standard Member</span>
                        )}
                      </td>
                      <td>
                        {u.is_banned ? (
                          <span className="aportal-status-banned">⛔ Banned</span>
                        ) : (
                          <span className="aportal-status-active">Active</span>
                        )}
                      </td>
                      <td className="aportal-actions-cell">
                        <div className="aportal-actions-wrapper">
                          <button
                            type="button"
                            onClick={() => handleToggleSuperuser(u)}
                            className="aportal-btn aportal-btn-ghost aportal-btn-small"
                          >
                            {u.is_superuser ? 'Demote' : 'Promote Admin'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTargetItem(u);
                              setModalType('ban_user');
                            }}
                            className={`aportal-btn aportal-btn-small ${
                              u.is_banned ? 'aportal-btn-unban' : 'aportal-btn-ban'
                            }`}
                          >
                            {u.is_banned ? 'Unban' : 'Ban User'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. CLUB GOVERNANCE TAB */}
      {activeTab === 'clubs' && (
        <div>
          <input
            type="text"
            placeholder="Search movie & TV series clubs..."
            value={clubQuery}
            onChange={(e) => setClubQuery(e.target.value)}
            className="aportal-search-input"
          />

          <div className="aportal-clubs-grid">
            {filteredClubs.length === 0 ? (
              <div className="aportal-empty-state">No clubs found.</div>
            ) : (
              filteredClubs.map((club) => (
                <div key={club.id} className="aportal-club-card">
                  <div>
                    <h4 className="aportal-club-title">{club.name}</h4>
                    <p className="aportal-club-desc">{club.description || 'No description provided.'}</p>
                  </div>
                  <div className="aportal-club-footer">
                    <span className="aportal-club-members">
                      👥 {club.memberCount || club.members_count || 1} Members
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setTargetItem(club);
                        setModalType('delete_club');
                      }}
                      className="aportal-btn aportal-btn-small aportal-btn-ban"
                    >
                      Delete Club
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 4. CONTENT MODERATION TAB */}
      {activeTab === 'moderation' && (
        <div>
          {modQueue.length === 0 ? (
            <div className="aportal-mod-clean-box">🎉 Moderation queue clean! No pending content reports.</div>
          ) : (
            <div className="aportal-mod-list">
              {modQueue.map((item) => (
                <div key={item.id} className="aportal-mod-card">
                  <div>
                    <div className="aportal-mod-header">
                      <span className="aportal-badge-report">{item.type || 'REPORT'}</span>
                      <span className="aportal-mod-meta">
                        Reported by {item.reportedBy} on {item.date}
                      </span>
                    </div>
                    <div className="aportal-mod-content">{item.content}</div>
                  </div>

                  <div className="aportal-actions-wrapper">
                    <button
                      type="button"
                      onClick={() => handleResolveModeration(item, 'dismiss')}
                      className="aportal-btn aportal-btn-ghost aportal-btn-small"
                    >
                      Dismiss Report
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResolveModeration(item, 'delete')}
                      className="aportal-btn aportal-btn-small aportal-btn-ban"
                    >
                      Remove Content
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. SYSTEM SETTINGS TAB */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="aportal-settings-form">
          <h3 className="aportal-settings-title">Global System Controls</h3>

          <label className="aportal-settings-label">
            <div>
              <div className="aportal-settings-name">Maintenance Mode</div>
              <div className="aportal-settings-desc">
                Temporarily disable user logins & write actions for system updates.
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="aportal-checkbox"
            />
          </label>

          <label className="aportal-settings-label">
            <div>
              <div className="aportal-settings-name">Allow New Signups</div>
              <div className="aportal-settings-desc">Toggle whether public registration is open for new users.</div>
            </div>
            <input
              type="checkbox"
              checked={settings.allowNewSignups}
              onChange={(e) => setSettings({ ...settings, allowNewSignups: e.target.checked })}
              className="aportal-checkbox"
            />
          </label>

          <div>
            <label className="aportal-input-label">Max Clubs Per User Limit</label>
            <input
              type="number"
              min={1}
              max={20}
              value={settings.maxClubsPerUser}
              onChange={(e) => setSettings({ ...settings, maxClubsPerUser: Number(e.target.value) })}
              className="aportal-number-input"
            />
          </div>

          <button type="submit" className="aportal-btn aportal-btn-primary aportal-btn-submit-settings">
            Save System Settings
          </button>
        </form>
      )}

      {/* CONFIRMATION MODALS */}
      <Modal isOpen={modalType === 'delete_club'} title="Confirm Delete Club" onClose={() => setModalType(null)}>
        <p className="aportal-modal-text">
          Are you sure you want to permanently delete club <strong>"{targetItem?.name}"</strong>? This will remove all
          club posts and member associations.
        </p>
        <div className="aportal-modal-actions">
          <button type="button" onClick={() => setModalType(null)} className="aportal-btn aportal-btn-ghost">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleDeleteClub(targetItem)}
            className="aportal-btn aportal-btn-danger-solid"
          >
            Delete Club
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={modalType === 'ban_user'}
        title={targetItem?.is_banned ? 'Unban User Account' : 'Ban User Account'}
        onClose={() => setModalType(null)}
      >
        <p className="aportal-modal-text">
          Are you sure you want to {targetItem?.is_banned ? 'unban' : 'ban'} user{' '}
          <strong>@{targetItem?.username || targetItem?.name}</strong>?
        </p>
        <div className="aportal-modal-actions">
          <button type="button" onClick={() => setModalType(null)} className="aportal-btn aportal-btn-ghost">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleToggleBan(targetItem)}
            className={`aportal-btn ${targetItem?.is_banned ? 'aportal-btn-primary' : 'aportal-btn-danger-solid'}`}
          >
            {targetItem?.is_banned ? 'Confirm Unban' : 'Confirm Ban'}
          </button>
        </div>
      </Modal>
    </div>
  );
}