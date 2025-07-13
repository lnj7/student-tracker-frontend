import React, { useState } from 'react';

export default function UpdateLocationForm({ student, onUpdate, onClose }) {
  const [lat, setLat] = useState(student.lat);
  const [lon, setLon] = useState(student.lon);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(student._id, { lat: parseFloat(lat), lon: parseFloat(lon) });
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.form}>
        <h2>Update Location for {student.name}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            step="any"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            step="any"
            placeholder="Longitude"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            style={styles.input}
          />
          <div style={styles.buttons}>
            <button type="submit" style={styles.button}>Update</button>
            <button type="button" onClick={onClose} style={styles.cancelButton}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    fontSize: '1rem',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};
