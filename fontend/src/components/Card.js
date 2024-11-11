import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Card.css';

function App() {
  const [cart, setCart] = useState([]);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const products = [
    { title: 'White Kurta Set', price: 1999, image: '/AMEHA (1).png' },
    { title: 'Lavender Kurta', price: 5999, image: '/AMEHA (2).png' },
    { title: 'Green Kurta Set', price: 2565, image: '/AMEHA (4).png' },
    { title: 'Ruffle Gown', price: 999, image: '/AMEHA (4).png' },
    { title: 'Wedding Gown', price: 2199, image: '/AMEHA (3).png' },
    { title: 'Party Gown', price: 7899, image: '/AMEHA (5).png' },
    { title: 'Casual Tee', price: 999, image: '/AMEHA(7).png' },
    { title: 'Crop Top', price: 2199, image: '/AMEHA (8).png' },
    { title: 'Peplum Top', price: 7899, image: '/AMEHA (9).png' },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    showNotification();
  };

  const showNotification = () => {
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 2000);
  };

  // Navigate to Cart page with cart items
  const goToCart = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h2>Discover Your Perfect Style</h2>
          <a href="#shop" className="btn-primary">Shop Now</a>
        </div>
      </section>

      <section id="shop" className="container">
        <h2 className="section-heading">Featured Products</h2>
        <div className="product-grid">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">₹{product.price}</p>
                <button onClick={() => addToCart(product)} className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {notificationVisible && <div className="notification">Product added to cart!</div>}

      {/* Button to navigate to Cart Page */}
      <button onClick={goToCart} className="btn-primary">View Cart</button>

      <footer>
        <div className="container">
          <p>&copy; 2024 AMEHA Clothing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
