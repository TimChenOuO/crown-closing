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
import {
    auth,
    createUserProfileDucoment
    // addCollectionsToFirebase
} from "./firebase/firebase-utils";

// Redux
import { setCurrentUser } from "./redux/user/user-action.js";
import { selectCurrentUser } from "./redux/user/user--selector";
import { selectNavBarHidden } from "./redux/nav-bar/navbart--selector";
// import { selectCollectionsForPreview } from "./redux/shop/shop--selector";

class App extends React.Component {
    unSubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser /*collectionsArry*/ } = this.props;
        this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            /*only display name, email, uid will be use in user obj that google auth provied
            auth.onAuthStateChanged(async user){
            createUserProfileDucoment(user);
            console.log(user);
            }*/

            if (userAuth) {
                const userRef = await createUserProfileDucoment(userAuth);
                userRef.onSnapshot(snapShop => {
                    setCurrentUser({
                        id: snapShop.id,
                        ...snapShop.data()
                    });
                    // console.log(this.state);
                });
            } else {
                // userAuth is an obj from auth that provided
                setCurrentUser(userAuth);
            }
            /*addCollectionsToFirebase(
                "collections",
                collectionsArry.map(({ title, items }) => ({ title, items }))
            );*/
        });
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth();
    }

    render() {
        // const { navBarHidden } = this.props;
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
    navBarHidden: selectNavBarHidden
    // collectionsArry: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
    // dispatch props of property name (name it what erver you want)
    //  this function get user obj than call dispatch(receive an obj)
    // this one is action function than pass the obj you want
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
