import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import SideBar from '../sidebar/SideBar';
import '../../components/styles/StudentDashboard.css';

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await dashboardAPI.getAdminDashboard();
        setSummary(data);
      } catch (err) {
        console.error('Failed to load admin dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="dashboard-container">
      <SideBar />
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
        </header>

        {loading && <p>Loading...</p>}

        {!loading && summary && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            <div className="card" style={{ padding: 20 }}>
              <h3>Total Students</h3>
              <p style={{ fontSize: 20, fontWeight: 700 }}>{summary.totalStudents || 0}</p>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <h3>Total Alumni</h3>
              <p style={{ fontSize: 20, fontWeight: 700 }}>{summary.totalAlumni || 0}</p>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <h3>Total Events</h3>
              <p style={{ fontSize: 20, fontWeight: 700 }}>{summary.totalEvents || 0}</p>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <h3>Total Jobs</h3>
              <p style={{ fontSize: 20, fontWeight: 700 }}>{summary.totalJobs || 0}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
