import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./overview-collections.scss";

// import PreviewCollections from "../preview-collections/Preview-collections";
import { selectCollectionsForPreview } from "../../redux/shop/shop--selector";
import Test from "../preview-collections/test";

const OverviewCollections = ({ collections }) => (
    <div className="collections-overview">
        {collections.map(({ id, ...otherProps }) => (
            <Test key={id} {...otherProps} />
        ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(OverviewCollections);
