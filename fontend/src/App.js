// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; 
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar'; 
import Cart from './components/Cart';
import Checkout from './components/Checkout'; 

// Make sure this path is correct

function App() {

  const [username, setUsername] = useState('');
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
   
  );
}

export default App;

