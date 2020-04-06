import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./header.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import CartIcon from "../cart-icon/Cart-icon";
import CartDropDown from "../cart-dropdown/Cart-dropdown";
import NavBarBtn from "../navBar-btn/NavBar-btn";

import { selectHidden } from "../../redux/cart/cart--seletor";
import { selectCurrentUser } from "../../redux/user/user--selector";
import { selectNavBarHidden } from "../../redux/nav-bar/navbart--selector";

import { signOutStart } from "../../redux/user/user-action";

const Header = ({ currentUser, hidden, signOutStart }) => (
    <div className="header">
        <NavBarBtn />
        <Link to="/" className="logo-container">
            <Logo className="logo" />
        </Link>
        <div className="spacing" />
        <div className="options">
            <Link to="/shop" className="option">
                SHOP
            </Link>
            <Link to="/shop" className="option">
                CONTACT
            </Link>
            {currentUser ? (
                <div className="option" onClick={signOutStart}>
                    Sign Out
                </div>
            ) : (
                <Link to="/signin" className="option">
                    Sign In
                </Link>
            )}
            <CartIcon />
        </div>
        {hidden ? null : <CartDropDown />}
    </div>
);
// state is from root-reducer
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectHidden,
    navBarHidden: selectNavBarHidden,
});

const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
