import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./directory.scss";

import MenuItem from "../menu-item/Menu-item";
import { selectSections } from "../../redux/directory/directory--selector";

const Directory = ({ sections }) => (
    <div className="directory-menu">
        {sections.map(({ id, ...otherprops }) => (
            <MenuItem key={id} {...otherprops} />
        ))}
    </div>
);
const mapStateToProps = createStructuredSelector({
    sections: selectSections
});

export default connect(mapStateToProps)(Directory);
