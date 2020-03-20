import React from "react";
import { connect } from "react-redux";
import { navBarHidden } from "../../redux/nav-bar/navbar-action";

import "./navBar-btn.scss";

const NavBarBtn = ({ navBarHidden }) => (
    <button className="toggle-btn" onClick={navBarHidden}>
        <div className="toggle-btn__line" />
        <div className="toggle-btn__line" />
        <div className="toggle-btn__line" />
    </button>
);

const dispatchToProps = dispatch => ({
    navBarHidden: () => dispatch(navBarHidden())
});

export default connect(null, dispatchToProps)(NavBarBtn);
