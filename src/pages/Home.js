import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Modal from '../components/Modal';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

    const [modalData, setModalData] = useState(null);

  const features = [
    {
      icon: '🗺️',
      title: 'Live Tracking',
      description: 'Know exactly where your students are in real time. Peace of mind with live location updates.'
    },
    {
      icon: '🗂️',
      title: 'Manage Profiles',
      description: 'Easily manage and organize all student details in one secure place.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is protected with advanced security measures you can trust.'
    }
  ];

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <h1>🎓 Student Tracker</h1>
        <p>Track, manage, and support your students in one modern app.</p>
 <div className="hero-buttons">
  {user ? (
    <>
      <Link to="/dashboard" className="btn primary">Go to Dashboard</Link>
      <button onClick={logout} className="btn secondary">Logout</button>
    </>
  ) : (
    <>
      <Link to="/register" className="btn primary">Get Started Free</Link>
      <Link to="/login" className="btn secondary">Login</Link>
    </>
  )}
</div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-cards">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="card"
              onClick={() => setModalData(feature)}
            >
              <span role="img" aria-label={feature.title}>{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Modal */}
      <Modal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        title={modalData?.title}
        description={modalData?.description}
        icon={modalData?.icon}
      />
      {/* Illustration / Screenshot */}
      <section className="screenshot">
        <h2>See It in Action</h2>
        <div className="screenshot-placeholder">
          <p>[ App Dashboard Screenshot Placeholder ]</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <h2>Why Choose Student Tracker?</h2>
       <ul>
  <li>Easy to use for schools & teachers</li>
  <li>Save time with streamlined tracking</li>
  <li>Real-time updates keep everyone informed</li>
  <li>Safe, secure, and reliable</li>
</ul>

      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Student Tracker. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </footer>
    </div>
  );
}
