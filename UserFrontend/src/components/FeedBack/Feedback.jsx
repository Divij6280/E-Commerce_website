import React from 'react';
import './Feedback.css'; // Ensure this path matches



const feedback = () => { // Changed to `NewsletterTemp`
    return (
        <div className="feedback">
            <h1>FEEL FREE TO CONTACT </h1>
            <h4>(FOR ANY QUERY EMAIL US HERE)</h4>
            <div>
                <input type="email" placeholder="Your Email ID" />
                <button>SUBMIT</button>
            </div>
        </div>
    );
};

export default feedback;

