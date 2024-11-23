import React, { createContext, useEffect, useState } from "react";
import all_product from '../components/assets/all_product';
import { toast } from 'react-toastify';

export const ShopContext = createContext(
    { all_product: [{}] }
);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${token}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            })
                .then((response) => response.json())
                .then((data) => setCartItems(data));
        }
    }, []);

    const clearCart = () => {
        setCartItems(getDefaultCart());
        toast.info("Cart cleared.");
    };

    const addToCart = (itemId) => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            toast.error("Sign in First to add the products in the cart");
            return;
        }
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        fetch('http://localhost:4000/addtocart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "itemId": itemId }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
        toast.success("Item Added to Cart Successfully!");
    };

    const removeFromCart = (itemId) => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            toast.error("Sign in First to remove the products from the cart");
            return;
        }
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        fetch('http://localhost:4000/removefromcart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "itemId": itemId }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
        toast.success("Item Removed From Cart Successfully!");
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        clearCart(); // Clear cart items from state
        toast.info("You have been logged out.");
    };

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, handleLogout };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
