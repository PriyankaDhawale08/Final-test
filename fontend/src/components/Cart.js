import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const [cart, setCart] = useState(location.state.cart);
  const [totalPrice, setTotalPrice] = useState(
    cart.reduce((total, item) => total + item.price, 0)
  );
  const navigate = useNavigate();

  // Proceed to checkout
  const goToCheckout = () => {
    navigate("/checkout", { state: { totalPrice } });
  };

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    // Update the total price
    const updatedTotalPrice = updatedCart.reduce((total, item) => total + item.price, 0);
    setTotalPrice(updatedTotalPrice);
  };

  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
              <p>{item.description}</p>
              <p>Price: ₹{item.price}</p>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <h2>Total Price: ₹{totalPrice}</h2>
          <button onClick={goToCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;



