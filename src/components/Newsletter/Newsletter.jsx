import React from 'react';
import './Newsletter.css'; // Ensure this path matches
// import Newsletter from '../components/Newsletter/Newsletter'; // Ensure this path is correct


const Newsletter = () => { // Changed to `NewsletterTemp`
    return (
        <div className="newsletter">
            <h1>GET EXCLUSIVE OFFERS ON YOUR E-MAIL</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <div>
                <input type="email" placeholder="Your Email ID" />
                <button>SUBSCRIBE</button>
            </div>
        </div>
    );
};

export default Newsletter;

