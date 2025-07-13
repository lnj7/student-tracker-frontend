import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css'; // <-- Import the CSS

export default function Profile() {
  const navigate = useNavigate();
  
  // ✅ Use the context directly!
  const { user, setUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/users/me`, formData);
      setUser(res.data);
      setEditing(false);
      alert('Profile updated!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    }
  };

  if (!user) {
    return <div className="profile-wrapper"><p>Loading user...</p></div>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2 className="profile-title">👤 Profile</h2>

        {editing ? (
          <>
            <div className="profile-input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="profile-input"
              />
            </div>
            <div className="profile-input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="profile-input"
              />
            </div>
            <div className="profile-actions">
              <button onClick={handleSave} className="profile-button save">💾 Save</button>
              <button onClick={() => setEditing(false)} className="profile-button cancel">Cancel</button>
            </div>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <button onClick={() => setEditing(true)} className="profile-button edit">✏️ Edit Profile</button>
          </>
        )}

        <hr style={{ margin: '24px 0' }} />
        <button onClick={handleLogout} className="profile-button logout">🚪 Logout</button>
      </div>
    </div>
  );
}
