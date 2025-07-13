import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({ theme, setTheme }) {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  if (loading) return null;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-brand">🎓 Student App</Link>
        <Link to="/" className="nav-link">Home</Link>
        {user ? (
          <>
            <Link to="/students" className="nav-link">Students</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>

      <div className="nav-right">
        <button onClick={toggleTheme} className="button button-outline">
          {theme === 'light' ? '🌙 Dark' : '🌞 Light'}
        </button>
        {user && <span className="nav-user">Hi, {user.email}</span>}
        {user && (
          <button onClick={handleLogout} className="button button-danger">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
