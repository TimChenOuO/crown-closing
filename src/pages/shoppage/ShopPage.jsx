import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import OverviewCollections from "../../components/overview-collections/Overview-collections";
import CollectionPage from "../collection-page/Collection-page";
import { fetchCollections } from "../../redux/shop/shop-action";
import withSpinner from "../../components/spinner/withSpinner";

import {
    firestore,
    convertCollectionsToObj
} from "../../firebase/firebase-utils";

const WithSpinnerOfOverviewCollections = withSpinner(OverviewCollections);
const WithSpinnerOfCollectionPage = withSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        isloading: true
    };

    unsubribeFromSnapshot = null;

    componentDidMount() {
        const { fetchCollections } = this.props;
        const collectionRef = firestore.collection("collections");

        this.unsubribeFromSnapshot = collectionRef.onSnapshot(
            async snapShot => {
                const collectionsMap = convertCollectionsToObj(snapShot);
                fetchCollections(collectionsMap);
                this.setState({ isloading: false });
            }
        );
    }

    render() {
        const { match } = this.props;
        const { isloading } = this.state;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    // props is <Route /> that provide such as match, history, ...
                    // render method receive a function
                    render={props => (
                        <WithSpinnerOfOverviewCollections
                            isloading={isloading}
                            {...props}
                        />
                    )}
                />
                <Route
                    path={`${match.path}/:collectionPageId`}
                    render={props => (
                        <WithSpinnerOfCollectionPage
                            isloading={isloading}
                            {...props}
                        />
                    )}
                />
            </div>
        );
    }
}

const dispatchToProps = dispatch => ({
    fetchCollections: collectionsMap =>
        dispatch(fetchCollections(collectionsMap))
});

export default connect(null, dispatchToProps)(ShopPage);
