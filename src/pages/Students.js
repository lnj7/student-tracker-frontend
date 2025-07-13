import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axiosConfig';
import './Students.css';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/students`);
        setStudents(res.data);
      } catch (err) {
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="students-wrapper">
      <header className="students-header">
        <h1>📚 Student Dashboard</h1>
        <Link to="/add-student" className="add-student-button">➕ Add Student</Link>
      </header>

      {students.length === 0 ? (
        <p className="no-students">No students found. Please add some!</p>
      ) : (
        <div className="students-grid">
          {students.map((student) => (
            <div key={student._id} className="student-card">
              <div className="card-header">
                <h3>{student.name}</h3>
                <Link to={`/track/${student._id}`} className="track-button">📍 Track</Link>
              </div>
              <div className="card-body">
                <p><strong>Age:</strong> {student.age}</p>
                <p><strong>Class:</strong> {student.className}</p>
                <p><strong>Parent Contact:</strong> {student.parentContact}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
