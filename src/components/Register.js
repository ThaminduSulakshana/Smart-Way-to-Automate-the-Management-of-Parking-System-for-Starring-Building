import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Here you can integrate your registration logic
    console.log('Registering with', { email, password, licensePlate });
    // On successful registration, redirect to login or home
    navigate('/login');
  };

  return (
    <div style={formContainer}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={formStyle}>
        <label style={labelStyle}>Email:</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <label style={labelStyle}>Password:</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <label style={labelStyle}>License Plate:</label>
        <input 
          type="text" 
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          placeholder="ABC-1234"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
};

const formContainer = {
  maxWidth: '400px',
  margin: 'auto',
  background: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const labelStyle = {
  marginBottom: '5px',
  fontWeight: 'bold'
};

const inputStyle = {
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px',
  background: '#333',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Register;
