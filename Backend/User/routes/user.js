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

        let cart = {};
        for (let i = 0; i < 100; i++) {
            cart[i] = 0;
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = new Users({ username, email, password: hash, cartData: cart });
        await newUser.save();

        const data = { user: { id: newUser._id } }; // Ensure _id is used
        const token = jwt.sign(data, 'secret_ecom', { expiresIn: "1h" });

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
            const data = { user: { id: user._id } };
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
const fetchUser = (req, res, next) => {
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
        const { itemId } = req.body;
        if (!itemId) {
            return res.status(400).json({ errors: "Item ID is required" });
        }

        const userData = await Users.findById(req.user.id);
        if (!userData.cartData) {
            userData.cartData = {};
        }
        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = 0;
        }

        userData.cartData[itemId] += 1;
        await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

        res.status(200).send({ message: "Added to cart" });
    } catch (error) {
        console.error("Error adding to cart: ", error); // Log error
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

// Endpoint to remove products from cart
router.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        const { itemId } = req.body;
        if (!itemId) {
            return res.status(400).json({ errors: "Item ID is required" });
        }

        const userData = await Users.findById(req.user.id);
        if (userData.cartData[itemId] > 0) {
            userData.cartData[itemId] -= 1;
        }
        await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

        res.status(200).send({ message: "Removed from cart" });
    } catch (error) {
        console.error("Error removing from cart: ", error); // Log error
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

// Endpoint to get cart data
router.post('/getcart', fetchUser, async (req, res) => {
    try {
        const userData = await Users.findById(req.user.id);
        res.status(200).json(userData.cartData);
    } catch (error) {
        console.error("Error fetching cart data: ", error); // Log error
        res.status(500).json({ errors: "Internal Server Error" });
    }
});

module.exports = router;
