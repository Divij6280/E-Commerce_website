/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Use useNavigate
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../assets/cart_cross_icon.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from "../Loading/Loader";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, loadingCart, removingItem, setDiscount, discount } = useContext(ShopContext);
  const [promoCode, setPromoCode] = useState("");
  const [totalAmount, setTotalAmount] = useState(getTotalCartAmount());
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePromoCodeSubmit = () => {
    const newTotalAmount = getTotalCartAmount();
    setTotalAmount(newTotalAmount);

    // Check if cart is empty
    const isCartEmpty = !cartItems?.length;

    if (isCartEmpty) {
      toast.error("Please Add Products to Avail Discounts", { autoClose: 500 });
      return; // Exit the function early
    }

    if (promoCode === "DISCOUNT20") {
      setDiscount(newTotalAmount * 0.2);
      toast.success("Discount added! Have Fun :)", { autoClose: 1000 });
    }
    else if (promoCode === "FULLMARKS") {
      setDiscount(newTotalAmount * 1);
      toast.success("Specially for Ms Sarika! Enjoy :)", { autoClose: 1000 });
    }
    else {
      setDiscount(0);
      toast.error("OOPS! Not a valid coupon", { autoClose: 500 });
    }
  };

  const handleRemoveFromCart = (itemId, size) => {
    removeFromCart(itemId, size);
    const newTotalAmount = getTotalCartAmount();
    setTotalAmount(newTotalAmount);
    setPromoCode("");  // Clear the promo code
    setDiscount(0);    // Reset the discount
  };

  // Recalculate total amount when cartItems change
  useEffect(() => {
    const newTotalAmount = getTotalCartAmount();
    setTotalAmount(newTotalAmount);
    setDiscount(0);  // Reset the discount whenever cart items change
    setPromoCode("");  // Clear the promo code whenever cart items change
  }, [cartItems]);

  const discountedTotal = totalAmount - discount;

  const handleProceedToCheckout = () => {
    navigate('/placeorder'); // Navigate to PlaceOrder page
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {
        loadingCart ?  <div className="loader-container">
          <div className="loader">
            <div className="bounce"></div>
            <div className="bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div> :
          cartItems && cartItems?.length ? all_product.map((e) => {
            const matchedItems = cartItems?.filter((item) => item?.item === e?.id);
            if (matchedItems && matchedItems.length > 0) {
              return matchedItems.map((foundItem) => (
                <div key={`${e.id}-${foundItem.size}`}>
                  <div className="cartitems-format cartitems-format-main">
                    <img
                      className="carticon-product-icon"
                      src={e.image}
                      alt={e.name}
                    />
                    <p>{e.name}</p>
                    <p>₹{e.new_price}</p>
                    <p className="cartitems-quantity">{foundItem?.qty}</p>
                    <p className="cart-items-size">{foundItem?.size}</p>
                    <p>₹{e.new_price * foundItem?.qty}</p>
                    {
                      removingItem[foundItem?.item] && removingItem[foundItem?.size] ? <div><Loader /></div> : <img
                        className="cartitems-remove-icon"
                        src={remove_icon}
                        onClick={() => handleRemoveFromCart(e.id, foundItem?.size)}
                        alt="Remove item from cart"
                      />
                    }
                  </div>
                  <hr />
                </div>
              ));
            }
            return null;
          }) : 
          <div className="empty-cart-message">
            <p>Oops! Your cart is currently empty. Start shopping and add some amazing items!</p>
            <button onClick={() => navigate('/')}>Go to Home</button>
          </div>}
      <ToastContainer position="bottom-right" />
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>SubTotal</p>
              <p>₹{totalAmount}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Discount</p>
              <p>-₹{discount}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>₹0</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{discountedTotal}</h3>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p><b><i>~ Have a promo code? ~</i></b></p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" value={promoCode} onChange={handlePromoCodeChange} />
            <button onClick={handlePromoCodeSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
