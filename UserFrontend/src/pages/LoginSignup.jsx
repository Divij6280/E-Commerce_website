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
            toast.error("Username is required for signup", {
                autoClose: 500
            });
            return false;
        }

        if (!email) {
            toast.error("Email is required", {
                autoClose: 500
            });
            return false;
        }

        if (!password) {
            toast.error("Password is required", {
                autoClose: 500
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const url = `http://localhost:4000/user/${isSignup ? 'signup' : 'login'}`;
        const requestBody = JSON.stringify(formData);
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        let responseData;

        try {
            await fetch(url, {
                method: 'POST',
                headers,
                body: requestBody,
            })
                .then((response) => response.json())
                .then((data) => (responseData = data));

            if (responseData?.success) {
                // Save auth token
                localStorage.setItem('auth-token', responseData.token);

                if (!isSignup) {
                    // Fetch cart data after login
                    await fetch('http://localhost:4000/user/getcart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': responseData.token,
                        },
                    })
                        .then((response) => response.json())
                        .then((cartData) => {
                            localStorage.setItem('cartData', JSON.stringify(cartData));
                        });
                }

                setFormData({ username: "", password: "", email: "" });
                navigate("/"); // Redirect to the home page after successful signup/login
                toast.success(isSignup ? "Signup successful! Redirecting to home." : "Login successful! Redirecting to home.", {
                    autoClose: 500
                });
            } else {
                toast.error(responseData.errors || "An error occurred", {
                    autoClose: 500
                });
            }
        } catch (error) {
            console.error("Network error:", error);
            toast.error("Network error. Please try again later.", {
                autoClose: 500
            });
        }
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
                                <p>Already have an account? LogIn now</p>
                                <button
                                    className="hidden"
                                    onClick={() => setIsSignup(false)}
                                >
                                    Sign In Now
                                </button>
                            </div>
                        ) : (
                            <div className="toggle-panel toggle-right">
                                <h1>Hello User!</h1>
                                <p>Don't have an account? SignUp now </p>
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
        </div>
    );
};

export default LoginSignup;
