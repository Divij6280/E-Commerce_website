import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from "../assets/star_icon.png"
import star_dull_icon from '../assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'
import { ToastContainer } from 'react-toastify';
import { productSizes } from './productDisplay.config'



const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    const [selectedSize, setSelectedSize] = useState("")
    const [showSizeError,setShowSizeError]=useState(false)

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(169)</p>
                </div>
                <div className='productdisplay-right-prices'>
                    <div className="productdisplay-right-price-old">₹{product.old_price}</div>
                    <div className="productdisplay-right-price-new">₹{product.new_price}</div>
                </div>
                <div className='product-display-right-description'>
                    A lightweight , usually knitted , pullover shirt , close fitting , a round neckline and short sleeves,
                    worn as an undershirt or outershirt or garments. Will fit perfectly on you
                </div>
              <div className='sizes-container'>  <div className='productdisplay-right-size'>
                    <h1>Select Size</h1>
                    <div className='productdisplay-right-sizes'>
                        {
                            productSizes.map((size,index) =>
                                <button key={index} className= {selectedSize===size? 'highlighted-size-button':'size-button'} onClick={()=>{
                                    setSelectedSize(size);
                                    setShowSizeError(false)}}>{size}</button>
                            )
                        }
                    </div>
                </div>
                {
                    showSizeError ? <span className='size-error'>Please select a size</span>: null
                }
                    </div> 
                <button className='addtocart' onClick={() => { if(selectedSize){ addToCart(product.id,selectedSize)} else setShowSizeError(true)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category : </span>Women/Men , T-Shirt , Crop-Top</p>
                <p className='productdisplay-right-category'><span>Tags : </span>Modern , Latest</p>
            </div>
            <ToastContainer position='bottom-right' />
        </div>
    )
}

export default ProductDisplay