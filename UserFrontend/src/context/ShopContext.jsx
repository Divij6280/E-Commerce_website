import React, { createContext, useEffect, useState } from "react";
import all_product from "../components/assets/all_product";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Default values for the context
export const ShopContext = createContext({
  all_product: [{}],
  cartItems: {},
  addToCart: () => { },
  removeFromCart: () => { },
  getTotalCartAmount: () => 0,
  getTotalCartItems: () => 0,
  clearCart: () => { },
  handleLogout: () => { },
  setFetchCart: () => { },
  loadingCart: false,
  removingItem: false,
});


const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false)
  const [removingItem, setRemovingItem] = useState({})
  const [fetchCart, setFetchCart] = useState(true)
  const [discount, setDiscount] = useState(0);
  




  // Fetch cart data on component mount if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      setLoadingCart(true);
      fetch("http://localhost:4000/user/getcart", {
        method: "POST",
        headers: {
          Accept: "application/json", // Ensure this matches the expected type
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Explicitly send an empty JSON object
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); // Parse only if the response is valid
        })
        .then((data) => {
          setCartItems(data);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        })
        .finally(() => {
          setLoadingCart(false);
          setFetchCart(false)
        });
    }
  }, [fetchCart]);

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared.", { autoClose: 500, pauseOnHover: false });
  };


  // Add item to the cart
  const addToCart = (itemId, selectedSize) => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      toast.error("Sign in to add products to the cart.", {
        autoClose: 500,
        pauseOnHover: false,
      });
      return;
    }


    fetch("http://localhost:4000/user/addtocart", {
      method: "POST",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId, selectedSize }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add to cart");
        return response.json();
      })
      .then((data) => { setFetchCart(true) })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart. Try again.", {
          autoClose: 500,
          pauseOnHover: false,
        });
      });

    toast.success("Item added to cart successfully!", {
      autoClose: 500,
      pauseOnHover: false,
    });
  };


  // Remove item from the cart
  const removeFromCart = (itemId, size) => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      toast.error("Sign in to remove products from the cart.", {
        autoClose: 500,
        pauseOnHover: false,
      });
      return;
    }

    setRemovingItem((prev) => ({ ...prev, [itemId]: true , [size]:size}))

    fetch("http://localhost:4000/user/removefromcart", {
      method: "POST",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId, size }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to remove from cart");
        return response.json();
      })
      .then((data) => setFetchCart(true))
      .catch((error) => {
        console.error("Error removing from cart:", error);
        toast.error("Failed to remove item from cart. Try again.", {
          autoClose: 500,
          pauseOnHover: false,
        });
      }).finally(() =>
        setRemovingItem((prev) => ({ ...prev, [itemId]: false ,[size]:false})))

    toast.success("Item removed from cart successfully!", {
      autoClose: 500,
      pauseOnHover: false,
    });
  };

  // Calculate total amount of items in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
  
    // Ensure cartItems is an array and iterate over it
    if (cartItems?.length > 0) {
      cartItems.forEach((item) => {
        // Find the product info from the all_product array
        const itemInfo = all_product.find((product) => product.id === Number(item.item));
  
        // If itemInfo exists, calculate the total amount
        if (itemInfo) {
          totalAmount += itemInfo.new_price * item.qty;  // Multiply price by the quantity
        }
      });
    }
  
    return totalAmount;
  };
  
  // Calculate total number of items in the cart
  const getTotalCartItems = () => {
    let sum = 0
    if (cartItems?.length) cartItems?.map((items) => sum = sum + items?.qty)
    return sum
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    // clearCart();
    toast.info("You have been logged out.", { autoClose: 500, pauseOnHover: false });
  };

  // Context value to be provided to children
  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    clearCart,
    loadingCart,
    removingItem,
    handleLogout,
    setFetchCart,setDiscount,
    discount
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;

};

export default ShopContextProvider;
