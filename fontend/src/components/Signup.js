import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Signup.css';

const Signup = () => {
  const [name, setName] = useState(''); // Changed from email to name
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:4200/signup', {
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
        setSuccess('Account created successfully. You can now log in.');
        setError('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Signup failed');
        setSuccess('');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred during signup');
    }
  };

  return (
    <div className="signupPage">
      <div className="signupContainer">
        <h2 className="title">Signup</h2>
        <input
          type="text"
          value={name} // Using name instead of email
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button onClick={handleSignup}>Sign up</button>

        <Link to="/login" className="loginLink">
          Already have an account? Log in here
        </Link>
      </div>
    </div>
  );
};

export default Signup;