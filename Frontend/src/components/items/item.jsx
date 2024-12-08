import React from "react";
import './item.css';
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Item = (props) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleClick = () => {
        navigate(`/product/${props.id}`); // Navigate to the product page
    };

    return (
        <div className="item" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <img src={props.image} alt={props.name} className="item-image" />
            <p className="item-name">{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">₹{props.new_price}</div>
                <div className="item-price-old">₹{props.old_price}</div>
            </div>
        </div>
    );
};

export default Item;