import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const [totalPrice] = useState(location.state.totalPrice);
  const [walletBalance, setWalletBalance] = useState(0);
  const navigate = useNavigate();

  // Function to generate a random reduced wallet balance within a specific range
  const getReducedWalletBalance = (currentBalance) => {
    const reductionAmount = Math.floor(Math.random() * (currentBalance / 2)); // Reducing the balance by a random amount up to 50% of the current balance
    return currentBalance - reductionAmount;
  };

  // Fetch user details and manipulate wallet balance from local storage (simulating session hijacking)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setWalletBalance(userData.walletBalance);

      // MALICIOUS SCRIPT: Hijack the session and reduce the wallet balance
      const manipulatedUserData = {
        ...userData,
        walletBalance: getReducedWalletBalance(userData.walletBalance), // Randomly reduce the balance
      };
      localStorage.setItem("userData", JSON.stringify(manipulatedUserData));

      alert(
        "Your wallet balance has been hijacked! New Balance: ₹" +
          manipulatedUserData.walletBalance
      );
    }
  }, []);

  // Handle checkout process
  const handleCheckout = () => {
    const updatedUserData = JSON.parse(localStorage.getItem("userData"));

    if (updatedUserData.walletBalance >= totalPrice) {
      fetch("http://localhost:4200/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedUserData.name,
          totalAmount: totalPrice,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Update wallet balance in localStorage
          const updatedUser = {
            ...updatedUserData,
            walletBalance: data.remainingBalance,
          };
          localStorage.setItem("userData", JSON.stringify(updatedUser));

          alert("Checkout successful! Remaining Balance: ₹" + data.remainingBalance);
          navigate("/home");
        })
        .catch((err) => {
          alert("Checkout failed. Try again.");
        });
    } else {
      alert("Insufficient wallet balance.");
      navigate("/home");
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total Price: ₹{totalPrice}</p>
      <p>Wallet Balance: ₹{walletBalance}</p>
      <button onClick={handleCheckout}>Proceed</button>
    </div>
  );
};

export default Checkout;