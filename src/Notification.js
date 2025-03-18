// src/components/Notification.js
import React, { useEffect } from 'react';

const Notification = () => {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/notifications');
    
    ws.onopen = () => {
      console.log('Connected to WebSocket for notifications.');
    };
    
    ws.onmessage = (event) => {
      const message = event.data;
      alert(message);  // Show a popup notification
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };
    
    // Cleanup on unmount
    return () => ws.close();
  }, []);
  
  return null;
};

export default Notification;