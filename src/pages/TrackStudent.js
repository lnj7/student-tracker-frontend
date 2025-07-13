import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function TrackStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/students/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error('❌ Failed to load student:', err);
        alert('Failed to load student.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <p>Loading student...</p>;
  if (!student) return <p>Student not found.</p>;

  return (
    <div style={styles.container}>
      <h2>📍 Tracking: {student.name}</h2>
      <button onClick={() => navigate(-1)} style={styles.backButton}>⬅️ Back</button>

      <div style={styles.mapContainer}>
        <MapContainer
          center={[student.lat, student.lon]}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[student.lat, student.lon]}>
            <Popup>
              {student.name}<br />Lat: {student.lat}<br />Lon: {student.lon}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, Arial, sans-serif',
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  mapContainer: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
  },
};
