import React, { useContext, useRef, useState } from 'react';
import './navbar.css'
import logo from'../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import nav_dropdown from '../assets/nav_dropdown.png'

export const Navbar = () => {

    const [menu,setMenu]= useState("shop");
    const {getTotalCartItems} = useContext(ShopContext)
    const menuRef = useRef();

    const dropdown_toggle=(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');

        e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="Logo"/>
                <p>LUXORA</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>SHOP</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to='/mens'>MEN</Link>{menu==="mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens'>WOMEN</Link>{menu==="womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>KID</Link>{menu==="kids"?<hr/>:<></>}</li>
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem('auth-token')?
                <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>LOGOUT</button>
                :<Link to='/login'><button>LOGIN</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="Cart"/></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div> 
            </div>
        </div>
    );
};

export default Navbar;