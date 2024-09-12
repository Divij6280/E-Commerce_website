const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Database Connection With MONGODB
mongoose.connect("mongodb+srv://Divij292:Divij11@cluster0.itnl6.mongodb.net/E-COMMERCE", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema for Users
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Map, // Use Map type for cartData
        of: Number,
        default: {}
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const Users = mongoose.model('Users', UserSchema);

// Middleware to fetch user based on token
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ errors: "Invalid token" });
    }
};

// Endpoint for user registration
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, errors: "User already exists with this email" });
    }

    const user = new Users({
        name: username,
        email,
        password,
        cartData: {}
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, 'secret_ecom');
    res.json({ success: true, token });
});

// Endpoint for user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (user) {
        if (user.password === password) {
            const token = jwt.sign({ id: user._id }, 'secret_ecom');
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, errors: "Incorrect password" });
        }
    } else {
        return res.json({ success: false, errors: "User not found" });
    }
});

// Endpoint for adding items to cart
app.post('/addtocart', fetchUser, async (req, res) => {
    const { itemId } = req.body;

    try {
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ errors: "User not found" });
        }

        user.cartData.set(itemId, (user.cartData.get(itemId) || 0) + 1);
        await user.save();

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ errors: "Server error" });
    }
});

// Endpoint for removing items from cart
app.post('/removefromcart', fetchUser, async (req, res) => {
    const { itemId } = req.body;

    try {
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ errors: "User not found" });
        }

        const currentQuantity = user.cartData.get(itemId) || 0;
        if (currentQuantity > 0) {
            user.cartData.set(itemId, currentQuantity - 1);
            if (user.cartData.get(itemId) === 0) {
                user.cartData.delete(itemId);
            }
            await user.save();
            res.json({ success: true });
        } else {
            res.status(400).json({ errors: "No items to remove" });
        }
    } catch (error) {
        res.status(500).json({ errors: "Server error" });
    }
});

// Endpoint for getting cart data
app.post('/getcart', fetchUser, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ errors: "User not found" });
        }
        res.json(user.cartData);
    } catch (error) {
        res.status(500).json({ errors: "Server error" });
    }
});

// Endpoint to clear cart data
app.post('/cleardata', fetchUser, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ errors: "User not found" });
        }

        user.cartData = {}; // Clear cart data
        await user.save();

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ errors: "Server error" });
    }
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server running on PORT ${PORT}`);
    } else {
        console.log(error);
    }
});
