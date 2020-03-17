import React from "react";
import { Route } from "react-router-dom";

import OverviewCollections from "../../components/overview-collections/Overview-collections";
import CollectionPage from "../collection-page/Collection-page";

const ShopPage = ({ match }) => (
    <div className="shop-page">
        <Route exact path={`${match.path}`} component={OverviewCollections} />
        <Route
            path={`${match.path}/:collectionPageId`}
            component={CollectionPage}
        />
    </div>
);

export default ShopPage;
