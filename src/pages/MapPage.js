import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';
import L from 'leaflet';

export default function MapPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/students', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('✅ Students fetched:', res.data);
        setStudents(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch students:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const createIcon = (photoUrl) =>
    L.divIcon({
      html: `<div class="avatar-marker">
               <img src="${photoUrl}" alt="student" />
             </div>`,
      className: '',
      iconSize: [50, 50],
      iconAnchor: [25, 25],
      popupAnchor: [0, -25],
    });

  const studentsWithLocation = students.filter(s =>
    s.location &&
    !isNaN(parseFloat(s.location.lat)) &&
    !isNaN(parseFloat(s.location.lng))
  );

  return (
    <div className="map-page">
      <h2>🗺️ All Students on Map</h2>
      {loading ? (
        <p>Loading map...</p>
      ) : studentsWithLocation.length === 0 ? (
        <p>No students with location data to show on map.</p>
      ) : (
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          scrollWheelZoom={true}
          className="map-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          {studentsWithLocation.map((student) => (
            <Marker
              key={student._id}
              position={[
                parseFloat(student.location.lat),
                parseFloat(student.location.lng)
              ]}
              icon={createIcon(student.photo || 'https://via.placeholder.com/50')}
            >
              <Popup>
                <strong>{student.name}</strong><br/>
                Last Updated:<br/>
                {new Date(student.updatedAt).toLocaleString()}<br/>
                {student.className && <>Class: {student.className}<br/></>}
                {student.age && <>Age: {student.age}<br/></>}
                {student.parentContact && <>Parent: {student.parentContact}</>}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
