import React, { useContext } from 'react';
import './CSS/ThankYouPage.css'; // Import the CSS file
import { ShopContext } from '../context/ShopContext';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const ThankYouPage = () => {
    const { cartItems, all_product, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5); // Example: 5 days from now

    return (
        <div className="thank-you-container">
            <AiOutlineCheckCircle className="success-icon animate-icon" />
            <h1>Thank You for Your Order!</h1>
            <p className="thank-you-message">Your order has been successfully placed. We appreciate your business!</p>
            <div className="order-summary">
                <h2>Order Summary</h2>
                <ul>
                    {all_product.map((product) => {
                        if (cartItems[product.id] > 0) {
                            return (
                                <li key={product.id}>
                                    <div className="product-name">{product.name}</div>
                                    <div className="product-details">
                                        <span>Price: ₹{product.new_price}</span>
                                        <span>Quantity: {cartItems[product.id]}</span>
                                        <span>Total: ₹{product.new_price * cartItems[product.id]}</span>
                                    </div>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
                <div className="order-total">
                    <h3>Total Amount: ₹{totalAmount}</h3>
                </div>
                <p className="delivery-info">Estimated Delivery Date: {estimatedDeliveryDate.toDateString()}</p>
            </div>
            <a href="/" className="go-back-button">Continue Shopping</a>
        </div>
    );
};

export default ThankYouPage;
