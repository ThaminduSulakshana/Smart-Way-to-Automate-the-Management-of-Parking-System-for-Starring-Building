import React, { useState } from 'react';
import Notification from '../Notification';

const Home = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [recognizedPlates, setRecognizedPlates] = useState([]);
  const [violations, setViolations] = useState([]);

  return (
    <div style={containerStyle}>
      {/* Navigation Bar */}
      <nav style={navStyle}>
        <h2 style={logoStyle}>Parking Detection</h2>
        <ul style={navListStyle}>
          <li><a href="/" style={navItemStyle}>Home</a></li>
          <li><a href="/about" style={navItemStyle}>About</a></li>
          <li><a href="/contact" style={navItemStyle}>Contact</a></li>
        </ul>
      </nav>

      {/* Header Section */}
      <header style={headerStyle}>
        <h1 style={titleStyle}>Live Parking Detection</h1>
      </header>

      <Notification />

      {/* Live Stream Section */}
      <div style={streamContainerStyle}>
        <h2>Live Detection Stream</h2>
        <img 
          src="http://localhost:8000/video_feed" 
          alt="Live Stream" 
          style={videoStyle}
        />
      </div>

      {/* Response Message */}
      {responseMessage && (
        <p style={messageStyle}>
          {responseMessage}
        </p>
      )}

      {/* Recognized Plates Section */}
      {recognizedPlates.length > 0 && (
        <div style={platesContainerStyle}>
          <h2>Recognized Plates:</h2>
          <ul>
            {recognizedPlates.map((plate, idx) => (
              <li key={idx} style={plateItemStyle}>{plate}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Violations Section */}
      {violations.length > 0 && (
        <div style={platesContainerStyle}>
          <h2>Violations:</h2>
          <ul>
            {violations.map((plate, idx) => (
              <li key={idx} style={plateItemStyle}>{plate} - VIOLATION</li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer Section */}
      <footer style={footerStyle}>
        <p>© 2025 Parking Detection System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

/* Styles */
const containerStyle = {
  width: '100%',
  minHeight: '100vh',
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const navStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#333',
  padding: '15px 20px',
  color: 'white',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
};

const logoStyle = {
  margin: 0,
  fontSize: '24px',
};

const navListStyle = {
  listStyle: 'none',
  display: 'flex',
  gap: '20px',
  margin: 0,
  padding: 0,
};

const navItemStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
};

const headerStyle = {
  width: '100%',
  marginTop: '80px', // Offset for fixed navbar
  padding: '40px 0',
  backgroundColor: '#105EEA',
  color: 'white',
  textAlign: 'center',
};

const titleStyle = {
  margin: 0,
  fontSize: '28px',
};

const streamContainerStyle = {
  marginTop: '30px',
  textAlign: 'center',
  width: '90%',
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const videoStyle = {
  width: '100%',
  maxWidth: '800px',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const messageStyle = {
  marginTop: '20px',
  fontWeight: 'bold',
  color: '#333',
};

const platesContainerStyle = {
  marginTop: '20px',
  backgroundColor: '#f9f9f9',
  padding: '15px',
  borderRadius: '8px',
  textAlign: 'left',
  width: '90%',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const plateItemStyle = {
  backgroundColor: '#eee',
  margin: '5px 0',
  padding: '8px',
  borderRadius: '4px',
};

const footerStyle = {
  width: '100%',
  marginTop: '40px',
  padding: '15px',
  backgroundColor: '#333',
  color: 'white',
  textAlign: 'center',
  position: 'relative',
  bottom: 0,
};

export default Home;