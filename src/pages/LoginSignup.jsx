import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CSS/LoginSignup.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignup = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });
    
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { username, email, password } = formData;
        if (isSignup && !username) {
            toast.error("Username is required for signup");
            return false;
        }
        if (!email) {
            toast.error("Email is required");
            return false;
        }
        if (!password) {
            toast.error("Password is required");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const url = `http://localhost:4000/${isSignup ? 'signup' : 'login'}`;
        const requestBody = JSON.stringify(formData);
        const headers = { 'Content-Type': 'application/json' };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: requestBody
            });
            const data = await response.json();

            if (data?.success) {
                localStorage.setItem('auth-token', data.token);

                if (!isSignup) {
                    // Fetch cart data after login
                    const cartResponse = await fetch('http://localhost:4000/getcart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': data.token
                        }
                    });
                    const cartData = await cartResponse.json();
                    localStorage.setItem('cartData', JSON.stringify(cartData));
                }

                setFormData({ username: "", password: "", email: "" });
                navigate("/"); // Redirect to home page after successful login/signup
                toast.success(isSignup ? "Signup successful!" : "Login successful!");
            } else {
                toast.error(data.errors || "An error occurred");
            }
        } catch (error) {
            toast.error("Network error. Please try again later.");
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            try {
                await fetch('http://localhost:4000/cleardata', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                });
                localStorage.removeItem('auth-token');
                localStorage.removeItem('cartData');
                toast.info("You have been logged out.");
            } catch (error) {
                toast.error("Error clearing cart data. Please try again later.");
            }
        }
        navigate("/"); // Redirect to home page or login page
    };

    return (
        <div className="bodylogin">
            <div className="container" id="container">
                <div className="form-container sign-in">
                    <form onSubmit={handleSubmit}>
                        <h1>{isSignup ? "Sign Up" : "Login"}</h1>
                        
                        {isSignup && (
                            <input
                                name="username"
                                value={formData.username}
                                onChange={changeHandler}
                                type="text"
                                placeholder="Enter Your Name"
                                required
                            />
                        )}

                        <input
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                            type="email"
                            placeholder="Enter Your Email"
                            required
                        />

                        <input
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                            type="password"
                            placeholder="Enter Your Password"
                            required
                        />

                        <button type="submit">
                            {isSignup ? "Sign Up" : "Login"}
                        </button>
                    </form>
                </div>

                <div className="toggle-container">
                    <div className="toggle">
                        {isSignup ? (
                            <div className="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>
                                <p>Already have an account? Log in to access all features.</p>
                                <button
                                    className="hidden"
                                    onClick={() => setIsSignup(false)}
                                >
                                    Sign In Now
                                </button>
                            </div>
                        ) : (
                            <div className="toggle-panel toggle-right">
                                <h1>Hello, Friend!</h1>
                                <p>Don't have an account? Sign up to get started.</p>
                                <button
                                    className="hidden"
                                    onClick={() => setIsSignup(true)}
                                >
                                    Sign Up Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <ToastContainer position="top-center" />
            </div>

            {/* Logout Button (could be placed in a different component) */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LoginSignup;
