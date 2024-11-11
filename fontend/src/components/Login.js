import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Login.css';

const Login = () => {
  const [name, setName] = useState(''); // Changed from email to name
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4200/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, // Using name instead of email
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in local storage
        localStorage.setItem('userData', JSON.stringify({
          name: data.name,
          walletBalance: data.walletBalance // Store wallet balance from backend
        }));
        navigate('/home'); // Redirect to home page after successful login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h2 className="title">Login</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Using name instead of email
          placeholder="Enter your name"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleLogin}>Log in</button>

        <Link to="/" className="signupLink"> 
          Don't have an account? Sign up here
        </Link>
      </div>
    </div>
  );
};

export default Login;