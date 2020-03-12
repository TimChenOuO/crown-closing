import React from "react";

import "./cart-dropdown.scss";

import CustomButton from "../custom-button/Custom-button";

const CartDropdown = () => (
    <div className="cart-dropdown">
        <div className="cart-items" />
        <CustomButton>Chect Out</CustomButton>
    </div>
);

export default CartDropdown;
