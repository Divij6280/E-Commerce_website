import React, { useContext, useEffect, useRef, useState } from 'react';
import './navbar.css';
import logo from '../assets/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { useTheme } from '../../context/ThemeContext';
import nav_dropdown from '../assets/nav_dropdown.png';
import { FiSun, FiMoon, FiShoppingCart } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const { darkMode, toggleDarkMode } = useTheme();
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();


    const totalItems=getTotalCartItems()



    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setMenu(path || 'shop');
    }, [location]);

    const dropdown_toggle = () => {
        menuRef.current.classList.toggle('nav-menu-visible');
    };

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setMenu("shop");
        navigate('/');
        // toast.success("You have successfully logged out", {
        //     position: "top-center",
        //     autoClose: 1000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        // });
    };

    const handleThemeToggle = () => {
        toggleDarkMode();
        // const themeMessage = darkMode ? "Light Theme" : "Dark Theme";
        // toast.success(themeMessage, {
        //     position: "top-center",
        //     autoClose: 50,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true
        // });
    };

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
        <>
            <div className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
                <div className="nav-logo">
                    <img src={logo} alt="Luxora Logo" />
                    <p onClick={() => setMenu("shop")} className={menu === "shop" ? "active" : ""}>
                        <Link to="/" style={{ textDecoration: 'none' }}>LUXORA</Link>
                    </p>
                </div>

                <img
                    className="nav-dropdown"
                    onClick={dropdown_toggle}
                    src={nav_dropdown}
                    alt="Dropdown Menu"
                    aria-label="Toggle Menu"
                />

                <ul ref={menuRef} className="nav-menu">
                    <li
                        onClick={() => setMenu("mens")}
                        className={menu === "mens" ? "active" : ""}
                    >
                        <Link to="/mens" style={{ textDecoration: 'none' }} aria-current={menu === "mens" ? "page" : undefined}>MEN</Link>
                    </li>
                    <li
                        onClick={() => setMenu("womens")}
                        className={menu === "womens" ? "active" : ""}
                    >
                        <Link to="/womens" style={{ textDecoration: 'none' }} aria-current={menu === "womens" ? "page" : undefined}>WOMEN</Link>
                    </li>
                    <li
                        onClick={() => setMenu("kids")}
                        className={menu === "kids" ? "active" : ""}
                    >
                        <Link to="/kids" style={{ textDecoration: 'none' }} aria-current={menu === "kids" ? "page" : undefined}>KID</Link>
                    </li>
                </ul>

                <div className="nav-login-cart">
                    {localStorage.getItem('auth-token') ? (
                        <>
                            <button onClick={handleLogout} aria-label="Logout">LOGOUT</button>
                            <Link to="/cart" aria-label="Cart" className="cart-icon-container">
                                <FiShoppingCart className="cart-icon" />
                                {totalItems && totalItems> 0 ? (
                                    <div className="nav-cart-count">{totalItems}</div>
                                ):null}
                            </Link>
                        </>
                    ) : (
                        <Link to="/login">
                            <button aria-label="Sign In">SIGN IN</button>
                        </Link>
                    )}

                    <div className="dark-mode-toggle" onClick={handleThemeToggle} aria-label="Toggle Dark Mode">
                        {darkMode ? <FiSun className="toggle-icon" /> : <FiMoon className="toggle-icon" />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
