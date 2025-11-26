import React, { useEffect, useState } from 'react';
import { profileAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import '../styles/StudentDashboard.css';

const AlumniProfile = () => {
	const { user } = useAuth();
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const resp = await profileAPI.getMyProfile();
				setProfile(resp.profile || resp);
			} catch (err) {
				console.error('Failed to load alumni profile', err);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	if (loading) return <div style={{ padding: 24 }}>Loading profile…</div>;

	const displayName = user?.name || profile?.user?.name || 'Alumnus';

	return (
		<div className="dashboard-container">
			<aside className="sidebar">
				<div>
					<div className="user-profile">
						<img src={profile?.profileImage || user?.avatar || 'https://i.pravatar.cc/150?img=12'} alt="avatar" />
						<div className="user-info">
							<h1>{displayName}</h1>
							<p>{profile?.currentRole || profile?.company || ''}</p>
						</div>
					</div>
				</div>
			</aside>

			<main className="main-content">
				<header style={{ marginBottom: 16 }}>
					<h1 style={{ margin: 0 }}>{displayName}</h1>
					<p style={{ color: '#6b7280' }}>{profile?.headline || 'Alumni profile'}</p>
				</header>

				<section className="card" style={{ padding: 20, marginBottom: 16 }}>
					<h3>About</h3>
					<p style={{ color: '#374151' }}>{profile?.bio || 'No bio available.'}</p>
				</section>

				<section className="card" style={{ padding: 20, marginBottom: 16 }}>
					<h3>Professional</h3>
					<div>
						<strong>{profile?.currentRole || '—'}</strong>
						<div style={{ color: '#6b7280' }}>{profile?.company || ''}</div>
						<div style={{ color: '#6b7280' }}>{profile?.yearsOfExperience ? `${profile.yearsOfExperience} yrs` : ''}</div>
					</div>
				</section>

				<section className="card" style={{ padding: 20, marginBottom: 16 }}>
					<h3>Industry & Interests</h3>
					<p style={{ color: '#6b7280' }}>{profile?.industry || '—'}</p>
					<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
						{(profile?.skills || []).map((s, i) => (
							<div key={i} style={{ padding: '6px 10px', background: '#f3f4f6', borderRadius: 6 }}>{s}</div>
						))}
					</div>
				</section>

				<section className="card" style={{ padding: 20 }}>
					<h3>Mentorship</h3>
					<p style={{ color: '#6b7280' }}>{profile?.mentorShipInterest ? 'Open to mentor' : 'Not currently mentoring'}</p>
				</section>
			</main>
		</div>
	);
};

export default AlumniProfile;

