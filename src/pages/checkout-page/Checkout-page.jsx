import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./checkout-page.scss";

import CheckoutItem from "../../components/checkout-item/Checkout-item";
import StripeHeckoutButton from "../../components/stripe-checkout-button/Stripe-checkout-button";

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
        <div className="text-warning">
            Use test info in stripe checkout
            <br />
            4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
        </div>
        <StripeHeckoutButton price={cartTotalAmount} />
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotalAmount: selectCartTotal
});

export default connect(mapStateToProps)(CheckOutPage);
