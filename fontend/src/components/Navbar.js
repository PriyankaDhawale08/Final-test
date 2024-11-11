import React from 'react';
import './Navbar.css'; // Assuming you have a CSS file for styling

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/logo.png" alt="" width="70" height="70" className="d-inline-block align-text-centre" />
          AMEHA
        </a>
      </div>
    </nav>
  );
}
