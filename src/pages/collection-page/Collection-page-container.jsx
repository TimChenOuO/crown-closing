import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import CollectionPage from "./Collection-page";
import withSpinner from "../../components/spinner/withSpinner";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop--selector";

const mapStateToProps = createStructuredSelector({
    isloading: state => !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionPage);

export default CollectionPageContainer;
