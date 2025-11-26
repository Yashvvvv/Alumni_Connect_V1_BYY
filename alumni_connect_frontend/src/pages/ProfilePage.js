import React from 'react';
import { useAuth } from '../context/AuthContext';
import StudentProfile from '../components/Student/StudentProfile';
import AlumniProfile from '../components/Alumni/AlumniProfile';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  const role = (user.role || '').toLowerCase();
  if (role === 'alumni') return <AlumniProfile />;
  return <StudentProfile />;
};

export default ProfilePage;
