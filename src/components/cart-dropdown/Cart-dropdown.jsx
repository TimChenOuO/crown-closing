import React from "react";
import { connect } from "react-redux";

import "./cart-dropdown.scss";

import CartItem from "../cart-item/Cart-item";
import CustomButton from "../custom-button/Custom-button";

const CartDropdown = ({ cartItems }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {cartItems.map(item => (
                <CartItem item={item} key={item.id} />
            ))}
        </div>
        <CustomButton>Chect Out</CustomButton>
    </div>
);

const mapStateToProp = ({ cart: { cartItems } }) => ({
    cartItems
});

export default connect(mapStateToProp)(CartDropdown);
