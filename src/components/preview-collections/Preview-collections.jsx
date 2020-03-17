import React from "react";
import { withRouter } from "react-router-dom";

import "./preview-collections.scss";

import CollectionItem from "../collection-item/Collection-item";

const PreviewCollections = ({ title, items, routeName, match, history }) => (
    <div className="collection-preview">
        <h1
            className="title"
            onClick={() => history.push(`${match.path}/${routeName}`)}
        >
            {title}
        </h1>
        <div className="preview">
            {items
                .filter((item, idx) => idx < 4)
                .map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
        </div>
    </div>
);

export default withRouter(PreviewCollections);
