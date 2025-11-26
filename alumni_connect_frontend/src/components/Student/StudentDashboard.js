import React, { useEffect, useState } from "react";
import "../styles/StudentDashboard.css";
import { FaHome, FaBookOpen, FaUserGraduate, FaChartLine, FaBell } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { dashboardAPI, profileAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [summary, setSummary] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // fetch dashboard summary counts from backend
        const data = await dashboardAPI.getStudentDashboard();
        setSummary(data);

        // fetch recommended profiles (simple search, show first 3)
        const profilesResp = await profileAPI.searchProfiles({});
        const profiles = profilesResp.profiles || [];
        setRecommended(profiles.slice(0, 3));
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayName = user?.name || "Student";

  return (
    <div className="dashboard-container">
      {/* === SIDEBAR === */}
      <aside className="sidebar">
        <div>
          <div className="user-profile">
            <img src={user?.avatar || "https://i.pravatar.cc/150?img=32"} alt="User Avatar" />
            <div className="user-info">
              <h1>{displayName}</h1>
              <p>{user?.role || "Student"}</p>
            </div>
          </div>

          <nav>
            <a
              href="#"
              className={`nav-link ${activeSection === "dashboard" ? "active" : ""}`}
              onClick={() => { setActiveSection("dashboard"); navigate('/StudentDashboard'); }}
            >
              <FaHome className="icon" />
              Home
            </a>
            <a
              href="#"
              className={`nav-link ${activeSection === "mentors" ? "active" : ""}`}
              onClick={() => { setActiveSection("mentors"); navigate('/network'); }}
            >
              <FaBookOpen className="icon" />
              Mentors
            </a>
            <a
              href="#"
              className={`nav-link ${activeSection === "jobs" ? "active" : ""}`}
              onClick={() => { setActiveSection("jobs"); navigate('/jobs'); }}
            >
              <FaChartLine className="icon" />
              Jobs
            </a>
            <a
              href="#"
              className={`nav-link ${activeSection === "events" ? "active" : ""}`}
              onClick={() => { setActiveSection("events"); navigate('/events'); }}
            >
              <FaChartLine className="icon" />
              Events
            </a>
            <a
              href="#"
              className={`nav-link ${activeSection === "profile" ? "active" : ""}`}
              onClick={() => { setActiveSection("profile"); navigate('/profile'); }}
            >
              <FaUserGraduate className="icon" />
              Profile
            </a>
          </nav>
        </div>

        <button className="nav-link logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome back, {displayName}!</h1>
          <p>Here's your personalized dashboard.</p>
        </header>

        <section className="card section-overview">
          <h2>Recommendations</h2>
          <div className="recommendations-grid">
            {loading && <p>Loading...</p>}
            {!loading && recommended.length === 0 && (
              <p>No recommendations yet. Complete your profile for better matches.</p>
            )}
            {!loading && recommended.map((rec, idx) => (
              <div key={rec._id || idx} className="card recommendation-card">
                <img src={rec.avatar || 'https://i.pravatar.cc/200?img=5'} alt={rec.user?.name || rec.name || 'Profile'} />
                <div className="card-body">
                  <h3>{rec.user?.name || rec.name || 'Unknown'}</h3>
                  <p>{rec.headline || rec.designation || (rec.user ? rec.user.role : '')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card section-activity" style={{ marginTop: "1.5rem" }}>
          <h2>Recent Activity</h2>
          <div className="activity-section">
            {loading && <p>Loading...</p>}
            {!loading && (
              <>
                <div className="activity-card">
                  <div className="activity-icon"><FaBell /></div>
                  <div>
                    <h3>You applied to a job</h3>
                    <p>Applied to {summary?.jobApplications || 0} job(s)</p>
                  </div>
                </div>

                <div className="activity-card">
                  <div className="activity-icon"><FaBell /></div>
                  <div>
                    <h3>You joined an event</h3>
                    <p>Registered for {summary?.registeredEvents || 0} event(s)</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="card quick-actions" style={{ marginTop: "1.5rem", display: 'flex', gap: '2rem' }}>
          <div style={{ flex: 1 }}>
            <h3>Quick Actions</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('/network')}>Find a Mentor</button>
              <button className="btn btn-primary" onClick={() => navigate('/jobs')}>Apply to Jobs</button>
              <button className="btn btn-primary" onClick={() => navigate('/events')}>Join an Event</button>
            </div>
          </div>

          <div style={{ width: 320 }}>
            <h3>Complete Your Profile</h3>
            <div className="profile-completion">
              <div className="progress-bar-simple">
                <div className="progress-fill-simple" style={{ width: `${summary?.profileCompletion || 60}%` }} />
              </div>
              <p style={{ marginTop: 8 }}>{summary?.profileCompletion || 60}%</p>
              <p style={{ color: '#666' }}>Complete your profile for better recommendations.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
