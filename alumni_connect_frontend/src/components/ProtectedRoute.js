import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    // debug log for auth failure
    // eslint-disable-next-line no-console
    console.log('[ProtectedRoute] no user -> redirecting to /login', { loading, user, allowedRoles });
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (allowedRoles) {
    const userRole = (user?.role || '').toString().toLowerCase();
    const allowed = allowedRoles.map(r => r.toString().toLowerCase());
    if (!allowed.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
