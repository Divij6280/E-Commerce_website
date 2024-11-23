import React, { useContext, useEffect, useRef, useState } from 'react';
import './navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import nav_dropdown from '../assets/nav_dropdown.png';

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const dropdown_toggle = () => {
        menuRef.current.classList.toggle('nav-menu-visible');
    };

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setMenu("shop");
        navigate('/');
    };

    // Close the dropdown when clicking outside of the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                menuRef.current.classList.remove('nav-menu-visible');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar">
            {/* Logo Section */}
            <div className="nav-logo">
                <img src={logo} alt="Luxora Logo" />
                <p>LUXORA</p>
            </div>

            {/* Dropdown Toggle for Mobile View */}
            <img
                className="nav-dropdown"
                onClick={dropdown_toggle}
                src={nav_dropdown}
                alt="Dropdown Menu"
                aria-label="Toggle Menu"
            />

            {/* Navigation Links */}
            <ul ref={menuRef} className="nav-menu">
                <li
                    onClick={() => setMenu("shop")}
                    className={menu === "shop" ? "active" : ""}
                >
                    <Link to="/" style={{ textDecoration: 'none' }}>HOME</Link>
                </li>
                <li
                    onClick={() => setMenu("mens")}
                    className={menu === "mens" ? "active" : ""}
                >
                    <Link to="/mens" style={{ textDecoration: 'none' }}>MEN</Link>
                </li>
                <li
                    onClick={() => setMenu("womens")}
                    className={menu === "womens" ? "active" : ""}
                >
                    <Link to="/womens" style={{ textDecoration: 'none' }}>WOMEN</Link>
                </li>
                <li
                    onClick={() => setMenu("kids")}
                    className={menu === "kids" ? "active" : ""}
                >
                    <Link to="/kids" style={{ textDecoration: 'none' }}>KID</Link>
                </li>
            </ul>

            {/* Login/Logout and Cart Section */}
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? (
                    <button onClick={handleLogout} aria-label="Logout">LOGOUT</button>
                ) : (
                    <Link to="/login">
                        <button aria-label="Sign In">SIGN IN</button>
                    </Link>
                )}

                <Link to="/cart" aria-label="Cart">
                    <img src={cart_icon} alt="Cart Icon" />
                    {getTotalCartItems() > 0 && (
                        <div className="nav-cart-count">{getTotalCartItems()}</div>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
