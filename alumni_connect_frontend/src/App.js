import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import StudentDashboard from './components/Student/StudentDashboard';
import AlumniDashboard from './components/Alumni/AlumniDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - Student */}
          <Route 
            path="/StudentDashboard" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Protected Routes - Alumni */}
          <Route 
            path="/AlumniDashboard" 
            element={
              <ProtectedRoute allowedRoles={['alumni']}>
                <AlumniDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Protected Routes - Admin */}
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Profile (read-only) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["student", "alumni", "admin"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
