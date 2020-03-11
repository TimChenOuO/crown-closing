import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

// Component
import HomePage from "./pages/homepage/Homepage";
import ShopPage from "./pages/shoppage/ShopPage";
import SignInOutPage from "./pages/sign-in-out-page/Sign-in-out-page";
import Header from "./components/header/Header";

// firebase method
import { auth, createUserProfileDucoment } from "./firebase/firebase-utils";

// Redux
import { setCurrentUser } from "./redux/user/user-action.js";

class App extends React.Component {
    unSubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;
        this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            // only display name, email, uid will be use in user obj that google auth provied
            // auth.onAuthStateChanged(async user){
            // createUserProfileDucoment(user);
            // console.log(user);
            // }
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
        });
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route path="/signin" component={SignInOutPage} />
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    // dispatch props of property name (name it what erver you want)
    //  this function get user obj than call dispatch(receive an obj)
    // this one is action function than pass the obj you want
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
