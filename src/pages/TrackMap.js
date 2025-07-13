import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in many setups
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function TrackMap() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch student details from backend
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/astudents/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load student.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <p>Loading student data...</p>;
  if (!student) return <p>Student not found.</p>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        ← Back to Dashboard
      </button>
      <h2>Tracking: {student.name}</h2>

      <MapContainer
        center={[student.lat, student.lon]}
        zoom={16}
        scrollWheelZoom={true}
        style={styles.map}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[student.lat, student.lon]}>
          <Popup>
            {student.name}'s Last Known Location
          </Popup>
        </Marker>
      </MapContainer>
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
    marginBottom: '10px',
    padding: '6px 12px',
    background: '#ccc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  map: {
    height: '400px',
    width: '100%',
    marginTop: '20px',
    borderRadius: '10px',
    overflow: 'hidden',
  },
};
