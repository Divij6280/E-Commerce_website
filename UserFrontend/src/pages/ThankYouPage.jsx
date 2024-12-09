import React, { useContext } from 'react';
import './CSS/ThankYouPage.css';
import { ShopContext } from '../context/ShopContext';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const ThankYouPage = () => {
    const { cartItems, all_product, getTotalCartAmount,discount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5); // Example: 5 days from now


    const discountedTotal = discount ?  totalAmount - discount:totalAmount;
    return (
        <div className="thank-you-container">
            <AiOutlineCheckCircle className="success-icon animate-icon" />
            <h1>Thank You for Your Order!</h1>
            <p className="thank-you-message">Your order has been successfully placed!</p>
            <div className="order-summary">
                <h2>Order Summary</h2>
                <ul>
                    {all_product.map((product) => {
                        const found=cartItems?.find((item)=>item?.item===product?.id)
                        if (found) {
                            return (
                                <li key={product.id}>
                                    <div className="product-name">{product.name}</div>
                                    <div className="product-details">
                                        <span>Price: ₹{product.new_price}</span>
                                        <span>Quantity: {found?.qty}</span>
                                        {/* <span>Total: ₹{product.new_price * found?.qty}</span> */}
                                    </div>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
                <div className="order-total">
                    <h3>Total Amount: ₹{discountedTotal}</h3>
                </div>
                <p className="delivery-info">Estimated Delivery Date: {estimatedDeliveryDate.toDateString()}</p>
            </div>
            <a href="/" className="go-back-button">Continue Shopping</a>
        </div>
    );
};

export default ThankYouPage;
