import React from "react";
import { connect } from "react-redux";

import "./collection-item.scss";

import CustomButton from "../custom-button/Custom-button";
import { addItem } from "../../redux/cart/cart-action";

const CollectionItem = ({ item, addItem }) => {
    const { name, imageUrl, price } = item;
    return (
        <div className="collection-item">
            <div
                className="image"
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="collection-footer">
                <span className="name">{name} </span>
                <span className="price">{price} </span>
            </div>
            <CustomButton
                className="custom-button"
                onClick={() => addItem(item)}
            >
                Add To Cart
            </CustomButton>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addItem: cartItem => dispatch(addItem(cartItem))
});

export default connect(null, mapDispatchToProps)(CollectionItem);
