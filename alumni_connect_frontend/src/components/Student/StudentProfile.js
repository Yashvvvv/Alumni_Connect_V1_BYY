import React, { useEffect, useState } from 'react';
import { profileAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import '../styles/StudentDashboard.css';

const StudentProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const resp = await profileAPI.getMyProfile();
        // `getMyProfile` returns { profile }
        setProfile(resp.profile || resp);
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading profile…</div>;

  const displayName = user?.name || profile?.user?.name || 'Student';

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div>
          <div className="user-profile">
            <img src={profile?.profileImage || user?.avatar || 'https://i.pravatar.cc/150?img=32'} alt="avatar" />
            <div className="user-info">
              <h1>{displayName}</h1>
              <p>Student · Class of {profile?.batch || profile?.yearOfStudy || '—'}</p>
            </div>
          </div>

          <nav>
            <div style={{ padding: '8px 0', color: '#6b7280' }}>Home</div>
          </nav>
        </div>
      </aside>

      <main className="main-content">
        <header style={{ marginBottom: 16 }}>
          <h1 style={{ margin: 0 }}>{displayName}</h1>
          <p style={{ color: '#6b7280' }}>{profile?.headline || 'Student profile'}</p>
        </header>

        <section className="card" style={{ padding: 20, marginBottom: 16 }}>
          <h3>About</h3>
          <p style={{ color: '#374151' }}>{profile?.bio || 'No bio available.'}</p>
        </section>

        <section className="card" style={{ padding: 20, marginBottom: 16 }}>
          <h3>Experience</h3>
          {profile?.company || profile?.currentRole ? (
            <div>
              <strong>{profile.currentRole || profile.company}</strong>
              <div style={{ color: '#6b7280' }}>{profile.company || ''}</div>
            </div>
          ) : (
            <p style={{ color: '#6b7280' }}>No experience listed.</p>
          )}
        </section>

        <section className="card" style={{ padding: 20, marginBottom: 16 }}>
          <h3>Education</h3>
          {profile?.currentCourse || profile?.batch ? (
            <div>
              <strong>{profile.currentCourse || '—'}</strong>
              <div style={{ color: '#6b7280' }}>{profile.batch ? `Class of ${profile.batch}` : ''}</div>
            </div>
          ) : (
            <p style={{ color: '#6b7280' }}>No education details.</p>
          )}
        </section>

        <section className="card" style={{ padding: 20, marginBottom: 16 }}>
          <h3>Skills & Interests</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(profile?.skills || profile?.interest || []).length === 0 && (
              <p style={{ color: '#6b7280' }}>No skills listed.</p>
            )}
            {(profile?.skills || profile?.interest || []).map((s, idx) => (
              <div key={idx} style={{ padding: '6px 10px', background: '#f3f4f6', borderRadius: 6 }}>{s}</div>
            ))}
          </div>
        </section>

        <section className="card" style={{ padding: 20, marginBottom: 16 }}>
          <h3>Preferences</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '8px 0', color: '#6b7280' }}>Mentorship Availability</td>
                <td style={{ textAlign: 'right' }}>{profile?.mentorShipInterest ? 'Available' : 'Not available'}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#6b7280' }}>Location</td>
                <td style={{ textAlign: 'right' }}>{profile?.location || '—'}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="card" style={{ padding: 20 }}>
          <h3>Activity</h3>
          <ul style={{ color: '#6b7280' }}>
            <li>Joined Alumni Connect: {new Date(profile?.createdAt || Date.now()).toLocaleDateString()}</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default StudentProfile;
