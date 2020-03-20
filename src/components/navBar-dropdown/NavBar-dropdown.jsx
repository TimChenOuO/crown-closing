import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../../firebase/firebase-utils";

import "./navBar-dropdown.scss";

import { navBarHidden } from "../../redux/nav-bar/navbar-action";

import { selectCurrentUser } from "../../redux/user/user--selector";
import { selectNavBarHidden } from "../../redux/nav-bar/navbart--selector";

const NavBarDropdown = ({
    currentUser,
    navBarHidden,
    dispatch,
    navBarHiddenFromState
}) => (
    <div className={`${navBarHiddenFromState ? "" : "open"} navbar-dropdown`}>
        <Link to="/shop" className="option" onClick={navBarHidden}>
            SHOP
        </Link>
        <Link to="/shop" className="option" onClick={navBarHidden}>
            CONTACT
        </Link>
        {currentUser ? (
            <div
                className="option"
                onClick={() => {
                    auth.signOut();
                    dispatch(navBarHidden());
                }}
            >
                Sign Out
            </div>
        ) : (
            <Link to="/signin" className="option" onClick={navBarHidden}>
                Sign In
            </Link>
        )}
    </div>
);

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
    navBarHiddenFromState: selectNavBarHidden(state)
});

const dispatchToProps = dispatch => ({
    navBarHidden: () => dispatch(navBarHidden())
});

export default connect(mapStateToProps, dispatchToProps)(NavBarDropdown);
