import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./checkout-page.scss";

import CheckoutItem from "../../components/checkout-item/Checkout-item";

import {
    selectCartItems,
    selectCartTotal
} from "../../redux/cart/cart--seletor";

const CheckOutPage = ({ cartItems, cartTotalAmount }) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        {cartItems.map(cartItem => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <div className="total">{`Total: $ ${cartTotalAmount}`}</div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotalAmount: selectCartTotal
});

export default connect(mapStateToProps)(CheckOutPage);
