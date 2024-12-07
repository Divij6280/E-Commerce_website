// src/pages/PlaceOrder.js

import React, { useState } from "react";
import "./CSS/PlaceOrder.css";
import { FaCreditCard, FaMoneyBillAlt, FaMobileAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Use useNavigate



const PlaceOrder = () => {
  const [paymentOption, setPaymentOption] = useState("card");
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handlePlaceOrder = () => {
    navigate('/thankyou'); // Navigate to ThankYou page
  };

  return (
    <div className="placeorder-container">
      <h2>Place Order</h2>
      <p>
        Choose a payment option below and fill out the appropriate information
      </p>

      <div className="payment-options">
        <button
          className={paymentOption === "card" ? "active" : ""}
          onClick={() => setPaymentOption("card")}
          aria-label="Pay with Credit Card"
        >
          <FaCreditCard /> Card
        </button>
        <button
          className={paymentOption === "cod" ? "active" : ""}
          onClick={() => setPaymentOption("cod")}
          aria-label="Pay with Cash on Delivery"
        >
          <FaMoneyBillAlt /> COD
        </button>
        <button
          className={paymentOption === "upi" ? "active" : ""}
          onClick={() => setPaymentOption("upi")}
          aria-label="Pay with UPI"
        >
          <FaMobileAlt /> UPI
        </button>
      </div>

      <div className="main">
        <div className="billing-address">
          <form className="placeorder-form">
            <h3>Billing Address</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name:</label>
                <input type="text" name="fullName" placeholder="Enter Your Name" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Address:</label>
                <input type="text" name="address" placeholder="Enter Your Address" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City:</label>
                <input type="text" name="city" placeholder="Enter Your City" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>State:</label>
                <select name="state" required className="scrollable-select">
                  <option value="">Select State</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Goa">Goa</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Assam">Assam</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Pin Code:</label>
                <input type="text" name="pin" placeholder="Enter Your Pin Code" required />
              </div>
            </div>
          </form>
        </div>

        <div>
          <form className="placeorder-form">
            {paymentOption === "card" && (
              <>
                <h3>Credit Card Info</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name on Card:</label>
                    <input type="text" name="cardName" placeholder="Demo User" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Card Number:</label>
                    <input type="Numeber" name="cardNumber" placeholder="6969 xxxx xxxx 6969" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>CVV Number:</label>
                    <input type="text" name="cvv"  placeholder="6x9" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Exp. Date:</label>
                    <input type="text" name="expDate"  placeholder="DD-MM-YYYY" required />
                  </div>
                </div>
              </>
            )}

            {paymentOption === "upi" && (
              <>
                <h3>UPI Info</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Enter Your UPI Id:</label>
                    <input type="text" name="upiId"  placeholder="divijxxxxxxpaytm" required />
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      <button type="submit" className="submit-button" onClick={handlePlaceOrder} >Place Your Order</button>
    </div>
  );
};

export default PlaceOrder;
