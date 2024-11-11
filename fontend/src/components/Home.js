import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousal from './Carousal';
import './Home.css'; 
import Card from './Card';

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();
  const [clothData, setClothData] = useState([]);

  const onButtonClick = () => {
    if (loggedIn) {
      // Handle logout logic here
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    // Fetch cloth data from ClothData.json
    fetch('/ClothData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setClothData(data))
      .catch(error => {
        console.error('Error fetching cloth data:', error);
      });
  }, []);

  return (
    <div className="home-container">
      <div className="content-container">
        <Carousal />
        <div className="welcome-message">
          <h1>Welcome!!</h1>
        </div>
        <div className="message-container">
          {loggedIn ? (
            <div className="logged-in-message">
              <p>Welcome back!</p>
              <p>Your email address is <strong>{email}</strong></p>
            </div>
          ) : (
            <p>Please SignUp to proceed.</p>
          )}
        </div>
        <div className="button-container">
          <button className="action-button" onClick={onButtonClick}>
            {loggedIn ? 'Log out' : 'SignUp'}
          </button>
        </div>
      </div>

      {/* Display Cloth Data */}
      <div className="cloth-data-container">
        <h2>Available Cloths</h2>
        <div className="cloth-grid">
          {clothData.map((item, index) => (
            <div key={index} className="cloth-card">
              <img src={item.img} alt={item.name} className="img-fluid" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>{item.CategoryName}</p>
            </div>
          ))}
        </div>
      </div>

      <Card/>
    </div>
  );
};

export default Home;

