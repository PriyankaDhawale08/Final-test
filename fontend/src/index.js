import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import App from './App'; // Adjust this import if your App component is in a different path
import './index.css'; // Your CSS file if applicable

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
