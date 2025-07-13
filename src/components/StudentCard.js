import React from 'react';
export default function StudentCard({ student, onTrack, onUpdateClick,  onDeleteClick }) {
  return (
    <div style={styles.card}>
      <h3>{student.name}</h3>
      <p>Last Location: {student.lat.toFixed(4)}, {student.lon.toFixed(4)}</p>
      <button onClick={onTrack} style={styles.button}>Cureent Location </button>
      <button onClick={() => onUpdateClick(student)} style={styles.updateButton}>Update Location</button>
      <button onClick={onTrack} style={styles.trackButton}>Track on Map</button>
       <button onClick={() => onDeleteClick(student._id)} style={styles.deleteButton}>🗑️ Delete</button>   
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: '8px',
    padding: '6px 12px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
   trackButton: {
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  updateButton: {
    marginTop: '8px',
    padding: '6px 12px',
    background: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};
