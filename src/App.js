import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import AddStudentPage from './components/AddStudentForm';
import Home from './pages/Home';
import TrackStudentPage from './pages/TrackStudent';
import Students from './pages/Students';
import PublicLayout from './components/PublicLayout';
import StudentMapPage from './pages/StudentMapPage';
import './App.css';
import './theme.css';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* 🌐 Public routes wrapped in PublicLayout */}
          <Route element={<PublicLayout theme={theme} setTheme={setTheme} />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* 🔒 Protected routes wrapped in Layout */}
          <Route
            element={
              <ProtectedRoute>
                <Layout theme={theme} setTheme={setTheme} />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-student" element={<AddStudentPage />} />
            <Route path="/track/:id" element={<TrackStudentPage />} />
            <Route path="/students-map" element={<StudentMapPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
