import React from "react";

import "./checkout-item.scss";

const CheckoutItem = ({ cartItem: { name, quantity, price, imageUrl } }) => (
    <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt="" />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">{quantity}</span>
        <span className="price">{price}</span>
        <span className="remove-button">&#10006;</span>
    </div>
);

export default CheckoutItem;