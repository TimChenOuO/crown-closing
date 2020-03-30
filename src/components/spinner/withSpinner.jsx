import React from "react";

import "./spinner.scss";

// HOC will take a component as argument
const withSpinner = WappedComponent => {
    // HOC will return a component (it can be class or function component also receive props from withSpinner)
    const spinner = ({ isloading, ...otherProps }) => {
        return isloading ? (
            <div className="spinnerOverlay">
                <div className="spinnerContainer" />
            </div>
        ) : (
            <WappedComponent {...otherProps} />
        );
    };
    return spinner;
};

export default withSpinner;
