import React from "react";
import { connect } from "react-redux";

import "./collection-page.scss";

import CollectionItem from "../../components/collection-item/Collection-item";
import { selectCollection } from "../../redux/shop/shop--selector";

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return (
        <div className="collection-page">
            <h2>{title}</h2>
            <div className="items">
                {items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionPageId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
