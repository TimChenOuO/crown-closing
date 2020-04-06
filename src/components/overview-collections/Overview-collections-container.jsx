import { connect } from "react-redux";
import { compose } from "redux";

import OverviewCollections from "./Overview-collections";
import withSpinner from "../spinner/withSpinner";
import { selectIsFetching } from "../../redux/shop/shop--selector";

const mapStateToProps = state => ({
    isloading: selectIsFetching(state)
});

// compose will read from right to left
// same as connect(mapStateToProps)(withSpinner(OverviewCollections))
const OverviewCollectionsContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(OverviewCollections);

export default OverviewCollectionsContainer;
