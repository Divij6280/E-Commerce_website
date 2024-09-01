import React, { useContext, useState } from 'react';
import './navbar.css'
import logo from'../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

export const Navbar = () => {

    const [menu,setMenu]= useState("shop");
    const {getTotalCartItems} = useContext(ShopContext)

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="Logo"/>
                <p>LUXORA</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>SHOP</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to='/mens'>MEN</Link>{menu==="mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens'>WOMEN</Link>{menu==="womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>KID</Link>{menu==="kids"?<hr/>:<></>}</li>
            </ul>
            <div className='nav-login-cart'>
                <Link to='/login'><button>LOGIN</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="Cart"/></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div> 
            </div>
        </div>
    );
};

export default Navbar;