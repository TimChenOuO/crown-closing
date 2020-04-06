import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import OverviewCollectionsContainer from "../../components/overview-collections/Overview-collections-container";
import CollectionPageContainer from "../collection-page/Collection-page-container";
import { fetchCollectionsStart } from "../../redux/shop/shop-action";

class ShopPage extends React.Component {
    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
    }

    render() {
        const { match } = this.props;

        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    // props is <Route /> that provide such as match, history, ...
                    // render method receive a function
                    component={OverviewCollectionsContainer}
                />
                <Route
                    path={`${match.path}/:collectionPageId`}
                    component={CollectionPageContainer}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
