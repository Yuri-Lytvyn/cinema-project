import React, { useState, useEffect } from 'react';
import '../styles/Notification.css';

const Notification = ({ type, message, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };
  
  if (!visible) return null;
  
  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-icon">
        {type === 'success' && '✓'}
        {type === 'error' && '✗'}
        {type === 'warning' && '⚠'}
        {type === 'info' && 'ℹ'}
      </div>
      <div className="notification-content">
        <p>{message}</p>
      </div>
      <button className="notification-close" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export default Notification;