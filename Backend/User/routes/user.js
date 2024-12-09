const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Endpoint for user registration
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ errors: "Please provide all required fields" });
    }

    try {
        let check = await Users.findOne({ email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing User Found With Same Email Address" });
        }

        // let cart = {};
        // for (let i = 0; i < 100; i++) {
        //     cart[i] = 0;
        // }

        const hash = await bcrypt.hash(password, 10);
        const newUser = new Users({ username, email, password: hash, cartData: [] });
        await newUser.save();

        const data = { user: { id: newUser.id } }; // change _id to id
        const token = jwt.sign(data, 'secret_ecom');

        return res.json({ success: true, token });

    } catch (error) {
        console.error("Error creating user: ", error); // Log the error
        return res.status(500).json({ success: false, errors: "Error creating user" });
    }
});

// Endpoint for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ errors: "Please Provide Your Credentials!" });
    }

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, errors: "Invalid Credentials!" });
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (passCompare) {
            const data = { user: { id: user.id } };
            const token = jwt.sign(data, 'secret_ecom');
            return res.json({ success: true, token });
        } else {
            return res.status(400).json({ success: false, errors: "Invalid Credentials!" });
        }
    } catch (error) {
        console.error("Error logging in: ", error); // Log the error
        return res.status(500).json({ success: false, errors: "Error logging in" });
    }
});

// Middleware to fetch user by token
const fetchUser = async(req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user; // Attach user info to request
        next();
    } catch (error) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
};




// Endpoint to add products to cart
router.post('/addtocart', fetchUser, async (req, res) => {
    try {
      const { itemId, selectedSize } = req.body;
  
      // Find user data
      const userData = await Users.findOne({ _id: req.user.id });
      if (!userData) {
        return res.status(404).send({ message: 'User not found', cartData: [] });
      }
  
      // Ensure cartData is always an array
      const cartData = userData.cartData || [];
  
      // Check if the item with the selected size already exists in the cart
      const found = cartData.find(
        (cart) => cart.item === itemId && cart.size === selectedSize
      );
  
      let updatedCartData;
      if (found) {
        // Update the quantity of the existing item
        updatedCartData = cartData.map((cart) =>
          cart.item === itemId && cart.size === selectedSize
            ? { ...cart, qty: cart.qty + 1 }
            : cart
        );
      } else {
        // Add a new item to the cart
        updatedCartData = [...cartData, { size: selectedSize, qty: 1, item: itemId }];
      }
  
      // Update user cartData
      await Users.findByIdAndUpdate(
        req.user.id,
        { cartData: updatedCartData },
        { new: true }
      );
  
      // Fetch updated user data
      const updatedUserData = await Users.findOne({ _id: req.user.id });
  
      res.status(200).send({
        message: 'Added to cart',
        cartData: updatedUserData.cartData,
      });
    } catch (error) {
      console.error('Error adding to cart: ', error); // Log the error for debugging
      res.status(500).json({ errors: 'Internal Server Error' });
    }
  });
  
  
// Endpoint to remove products from cart
// Endpoint to remove products from cart
router.post('/removefromcart', fetchUser, async (req, res) => {
    try {
      const { itemId, size } = req.body;
  
      // Validate input
      if (!itemId || !size) {
        return res.status(400).json({ errors: "Item ID and size are required" });
      }
  
      // Find the user
      const userData = await Users.findById(req.user.id);
      if (!userData) {
        return res.status(404).json({ errors: "User not found" });
      }
  
      // Ensure cartData is always an array
      const cartData = userData.cartData || [];
  
      // Check if the item exists in the cart
      const foundItem = cartData.find(
        (cart) => cart.item === itemId && cart.size === size
      );
  
      if (!foundItem) {
        return res.status(404).json({ errors: "Item not found in cart" });
      }
  
      // Remove the object if qty becomes 0, else decrement qty
      const updatedCartData = cartData.map((cart) =>
        cart.item === itemId && cart.size === size
          ? { ...cart, qty: cart.qty - 1 }
          : cart
      ).filter((cart) => cart.qty > 0); // Remove items with qty <= 0
  
      // Update the user's cartData in the database
      await Users.findByIdAndUpdate(req.user.id, { cartData: updatedCartData }, { new: true });
  
      // Fetch updated cart data
      const updatedUserData = await Users.findById(req.user.id);
  
      // Respond with success and updated cart data
      return res.status(200).send({
        message: "Item updated or removed successfully",
        cartData: updatedUserData.cartData,
      });
    } catch (error) {
      console.error("Error removing from cart:", error); // Log the error
      return res.status(500).json({ errors: "Internal Server Error" });
    }
  });
  
  
// Endpoint to get cart data
router.post('/getcart', fetchUser, async (req, res) => {
    
    try {
        const userData = await Users.findOne({_id:req.user.id});
        console.log("user data",userData)
        res.status(200).json(userData.cartData);
    } catch (error) {
        console.error("Error fetching cart data: ", error); // Log error
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

module.exports = router;
