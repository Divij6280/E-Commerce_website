import React, { createContext, useEffect, useState } from "react";
import all_product from '../components/assets/all_product';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext({
    all_product: [{}],
    cartItems: {},
    addToCart: () => {},
    removeFromCart: () => {},
    getTotalCartAmount: () => 0,
    getTotalCartItems: () => 0,
    clearCart: () => {},
    handleLogout: () => {}
});

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        cart[all_product[index].id] = 0;
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
                    'auth-token': token,
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch cart data');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data) setCartItems(data);
                })
                .catch((error) => {
                    console.error('Error fetching cart data:', error);
                    // toast.error('Failed to fetch cart data.', { autoClose: 500, pauseOnHover: false });
                });
        }
    }, []);

    const clearCart = () => {
        setCartItems(getDefaultCart());
        toast.info("Cart cleared.", { autoClose: 500, pauseOnHover: false });
    };

    const addToCart = (itemId) => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            toast.error("Sign in First to add the products in the cart", { autoClose: 500, pauseOnHover: false });
            return;
        }
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        fetch('http://localhost:4000/addtocart', {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add to cart');
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => {
                console.error('Error adding to cart:', error);
                // toast.error('Failed to add to cart.', { autoClose: 500, pauseOnHover: false });
            });
        toast.success("Item Added to Cart Successfully!", { autoClose: 500, pauseOnHover: false });
    };

    const removeFromCart = (itemId) => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            toast.error("Sign in First to remove the products from the cart", { autoClose: 500, pauseOnHover: false });
            return;
        }
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) - 1 }));
        fetch('http://localhost:4000/removefromcart', {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to remove from cart');
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => {
                console.error('Error removing from cart:', error);
                // toast.error('Failed to remove from cart.', { autoClose: 500, pauseOnHover: false });
            });
        toast.success("Item Removed From Cart Successfully!", { autoClose: 500, pauseOnHover: false });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
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
        toast.info("You have been logged out.", { autoClose: 500, pauseOnHover: false });
    };

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, clearCart, handleLogout };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
