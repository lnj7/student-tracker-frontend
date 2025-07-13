import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function StudentMap({ lat, lon, name, onClose }) {
  return (
    <div style={styles.overlay}>
      <button onClick={onClose} style={styles.closeButton}>Close Map</button>
      <MapContainer center={[lat, lon]} zoom={13} style={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[lat, lon]}>
          <Popup>{name}'s last location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column'
  },
  closeButton: {
    padding: '8px 16px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    alignSelf: 'flex-end',
    margin: '10px'
  },
  map: {
    flex: 1
  }
};
