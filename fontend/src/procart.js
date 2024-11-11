// Cart.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Card.css'; // Assuming you use the same CSS file

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || []; // Retrieve cart items from location state

  // Calculate the total amount
  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  // Handle removing an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    navigate('/cart', { state: { cart: updatedCart } }); // Navigate to update the cart state
  };

  // Handle checkout navigation
  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } }); // Navigate to the checkout page with cart data
  };

  return (
    <div className="cart-container">
      <h2 className="section-heading">Your Cart</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <p>{item.title} - ₹{item.price}</p>
              <button onClick={() => removeFromCart(index)} className="remove-button">Remove</button>
            </div>
          ))}
          <h3>Total Amount: ₹{totalAmount}</h3>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;