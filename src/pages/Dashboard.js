import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import AddStudentForm from '../components/AddStudentForm';
import UpdateLocationForm from '../components/UpdateLocationForm';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [studentToUpdate, setStudentToUpdate] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/students`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(res.data);
      } catch (err) {
        console.error('Failed to fetch students', err);
        alert('Failed to load students.');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/students/${id}`);
      setStudents(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error('Error deleting student:', err);
      alert('Error deleting student.');
    }
  };

  const handleAddStudent = async (newStudent) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/students`, newStudent);
      setStudents(prev => [...prev, res.data]);
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding student:', err);
      alert('Error adding student.');
    }
  };

  const handleUpdateStudent = async (id, updated) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/students/${id}`, updated);
      setStudents(prev => prev.map(s => s._id === id ? { ...s, ...updated } : s));
      setStudentToUpdate(null);
    } catch (err) {
      console.error('Error updating student:', err);
      alert('Error updating student.');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>📚 Student Dashboard</h1>
        <button className="btn add" onClick={() => setShowAddForm(true)}>➕ Add Student</button>
      </header>

      {loading ? (
        <div className="loader">Loading students...</div>
      ) : students.length === 0 ? (
        <p className="no-data">No students found. Add your first student!</p>
      ) : (
        <div className="student-grid">
          {students.map(student => (
            <div key={student._id} className="student-card">
              <h3>{student.name}</h3>
              <p className="location">📍 {student.location || 'Unknown Location'}</p>
              <p className="timestamp">🕒 Last Updated: {new Date(student.updatedAt).toLocaleString()}</p>
              <div className="card-actions">
                <button className="btn track" onClick={() => navigate(`/track/${student._id}`)}>📌 Track</button>
                <button className="btn edit" onClick={() => setStudentToUpdate(student)}>✏️ Edit</button>
                <button className="btn delete" onClick={() => handleDeleteStudent(student._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddForm && (
        <AddStudentForm onAdd={handleAddStudent} onClose={() => setShowAddForm(false)} />
      )}

      {studentToUpdate && (
        <UpdateLocationForm
          student={studentToUpdate}
          onUpdate={handleUpdateStudent}
          onClose={() => setStudentToUpdate(null)}
        />
      )}

    <div style={{ textAlign: 'center', marginTop: '20px' }}>
  <button
    className="show-map-btn"
    onClick={() => navigate('/students-map')}
  >
    🗺️ Show All Students on Map
  </button>
</div>
    </div>
  );
}
