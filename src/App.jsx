import React from "react";
import { Switch, Route, Redirect } from "react-router-dom"; //add Redirect to prevent customer still can access sign-page when they have been sign in
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

// Component
import HomePage from "./pages/homepage/Homepage";
import ShopPage from "./pages/shoppage/ShopPage";
import SignInOutPage from "./pages/sign-in-out-page/Sign-in-out-page";
import Header from "./components/header/Header";
import CheckOutPage from "./pages/checkout-page/Checkout-page";
import NavBarDropdown from "./components/navBar-dropdown/NavBar-dropdown";
// firebase method´
// import {
//     auth,
//     createUserProfileDucoment
//     // addCollectionsToFirebase
// } from "./firebase/firebase-utils";

// Redux
import { checkUserSession } from "./redux/user/user-action.js";
import { selectCurrentUser } from "./redux/user/user--selector";
// import { selectCollectionsForPreview } from "./redux/shop/shop--selector";

class App extends React.Component {
    // unSubscribeFromAuth = null;
    componentDidMount() {
        const { checkUserSession } = this.props;
        checkUserSession();
    }
    // componentWillUnmount() {
    //    << same as call auth.onAuthStateChanged() again to close it >>
    //     this.unSubscribeFromAuth();
    // }

    render() {
        return (
            <div>
                <Header />
                <div className="spacing" />
                <NavBarDropdown />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route exact path="/checkout" component={CheckOutPage} />
                    <Route
                        exact
                        path="/signin"
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to="/" />
                            ) : (
                                <SignInOutPage />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    // collectionsArry: selectCollectionsForPreview
});

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
