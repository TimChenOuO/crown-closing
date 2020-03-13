import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./cart-dropdown.scss";

import CartItem from "../cart-item/Cart-item";
import CustomButton from "../custom-button/Custom-button";
import { selectCartItems } from "../../redux/cart/cart--seletor";
import { toggleCartHidden } from "../../redux/cart/cart-action";

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className="cart-dropdown">
        {cartItems.length ? (
            <div className="cart-items">
                {cartItems.map(item => (
                    <CartItem item={item} key={item.id} />
                ))}
            </div>
        ) : (
            <span className="empty-message">Empty Cart</span>
        )}
        <CustomButton
            onClick={() => {
                history.push("/checkout");
                dispatch(toggleCartHidden());
            }}
        >
            Chect Out
        </CustomButton>
    </div>
);

const mapStateToProp = state => ({
    cartItems: selectCartItems(state)
});

export default withRouter(connect(mapStateToProp)(CartDropdown));
