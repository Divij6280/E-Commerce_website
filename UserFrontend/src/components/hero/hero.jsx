import React from "react";
import './hero.css'
import arrow_icon from '../assets/arrow.png'
import hero_image from '../assets/hero_image.png'

const Hero=()=>{
    return(
        <div className="hero">
            <div className="hero-left">
                <div>
                    <p>NEW</p>
                    <p>COLLECTION</p>
                    <p>FOR EVERYONE</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="Arrow Icon"/>
                </div>
            </div>
        <div className="hero-right">
            <img src={hero_image} alt="Hero"/>
        </div>
    </div>
    )
}
export default Hero