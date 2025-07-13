import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from '../api/axiosConfig';
import './StudentMapPage.css';

export default function StudentMapPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data);
      } catch (err) {
        console.error('Error fetching students:', err);
        alert('Error loading student data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p>Loading map...</p>;

  // Default center
  const center = students.length
    ? [students[0].lat || 20, students[0].lon || 78]
    : [20, 78];

  return (
    <div className="map-wrapper">
      <h2>🗺️ All Students Map View</h2>
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '80vh', width: '100%', borderRadius: '12px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {students
          .filter((s) => s.lat && s.lon)
          .map((student) => {
            const studentIcon = L.divIcon({
              className: 'student-marker',
              html: `<div class='marker-name'>${student.name}</div>`,
              iconSize: [40, 40],
              iconAnchor: [20, 20],
            });

            return (
              <Marker
                key={student._id}
                position={[student.lat, student.lon]}
                icon={studentIcon}
              >
                <Popup>
                  <strong>{student.name}</strong><br/>
                  Lat: {student.lat}<br/>
                  Lon: {student.lon}
                </Popup>
                <Tooltip>{student.name}</Tooltip>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}
