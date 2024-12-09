
import React, { useState } from 'react';
import './CSS/PlaceOrder.css';
import { FaCreditCard, FaMoneyBillAlt, FaMobileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const [paymentOption, setPaymentOption] = useState('card');
    const navigate = useNavigate(); 

    const handleSubmit = (e) => { 
        e.preventDefault();
        navigate('/thankyou');
    };

    return (
        <div className="placeorder-container">
        <h2>Place Order</h2>
        <p>Choose a payment option below and fill out the appropriate information</p>

        <div className="payment-options">
            <button className={paymentOption === 'card' ? 'active' : ''} onClick={() => setPaymentOption('card')}>
            <FaCreditCard /> Card
            </button>
            <button className={paymentOption === 'cod' ? 'active' : ''} onClick={() => setPaymentOption('cod')}>
            <FaMoneyBillAlt /> COD
            </button>
            <button className={paymentOption === 'upi' ? 'active' : ''} onClick={() => setPaymentOption('upi')}>
            <FaMobileAlt /> UPI
            </button>
        </div>

        <div className='main'>
            <div className='billing-address'>
            <form className="placeorder-form">
                <h3>Billing Address</h3>
                <div className="form-row">
                <div className="form-group">
                    <label>Full Name:</label>
                    <input type="text" name="fullName" required />
                </div>
                </div>
                <div className="form-row">
                <div className="form-group">
                    <label>Address 1:</label>
                    <input type="text" name="address1" required />
                </div>
                </div>
                <div className="form-row">
                <div className="form-group">
                    <label>Address 2:</label>
                    <input type="text" name="address2" required />
                </div>
                </div>
                <div className="form-row">
                <div className="form-group">
                    <label>City:</label>
                    <input type="text" name="city" required />
                </div>
                </div>
                <div className="form-row">
                <div className="form-group">
                    <label>State:</label>
                    <select name="state" required className="scrollable-select">
                        <option value="">Select State</option>
                        <option value="state1">Punjab</option>
                        <option value="state2">Haryana</option>
                        <option value="state3">Chandigarh</option>
                        <option value="state4">Delhi</option>
                        <option value="state5">Uttarakhand</option>
                        <option value="state6">Sikkim</option>
                        <option value="state7">Uttar Pradesh</option>
                        <option value="state8">Odisha</option>
                        <option value="state9">Goa</option>
                        <option value="state10">Maharashtra</option>
                        <option value="state11">Karnataka</option>
                        <option value="state12">Kerala</option>
                        <option value="state13">Himachal Pradesh</option>
                        <option value="state14">Gujarat</option>
                        <option value="state15">Assam</option>
                        <option value="state16">Andhra Pradesh</option>
                        <option value="state17">Arunachal Pradesh</option>
                        <option value="state18">West Bengal</option>
                    </select>
                    </div>
                </div>

                <div className='form-row'>
                    <div className="form-group">
                    <label>Zip Code:</label>
                    <input type="text" name="zip" required />
                    </div>
                </div>
            </form>
            </div>


            <div>
            <form className="placeorder-form">
                {paymentOption === 'card' && (
                <>
                    <h3>Credit Card Info</h3>
                    <div className="form-row">
                    <div className="form-group">
                        <label>Name on Card:</label>
                        <input type="text" name="cardName" required />
                    </div>
                    <div className="form-group">
                        <label>Card Number:</label>
                        <input type="text" name="cardNumber" required />
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group">
                        <label>CVV Number:</label>
                        <input type="text" name="cvv" required />
                    </div>
                    <div className="form-group">
                        <label>Exp. Month:</label>
                        <input type="text" name="expMonth" required />
                    </div>
                    </div>
                    <div className='form-group'>
                        <div className="form-group">
                            <label>Exp. Year:</label>
                            <input type="text" name="expYear"  required />
                        </div>
                    </div>
                    
                </>
                )}

                {paymentOption === 'upi' && (
                <>
                    <h3>Enter Your UPI Information</h3>
                    <div className="form-row">
                    <div className="form-group">
                        <label>Enter Your UPI Id:</label>
                        <input type="text" name="upiId" required />
                    </div>
                    </div>
                </>
                )}
            </form>
            </div>        
        </div>

        <button type="submit" className="submit-button" onClick={handleSubmit}>Continue</button>

        </div>
    );
    }

export default PlaceOrder;
