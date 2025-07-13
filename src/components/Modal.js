import React from 'react';
import './Modal.css';

export default function Modal({ isOpen, onClose, title, description, icon }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="modal-icon">{icon}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
