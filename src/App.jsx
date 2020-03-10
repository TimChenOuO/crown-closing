import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/Homepage";
import ShopPage from "./pages/shoppage/ShopPage";
import SignInOutPage from "./pages/sign-in-out-page/Sign-in-out-page";

import Header from "./components/header/Header";

import { auth } from "./firebase/firebase-utils";

class App extends React.Component {
    state = {
        currentUser: null
    };

    unSubscribeFromAuth = null;

    componentDidMount() {
        this.unSubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({ currentUser: user });
            console.log(user);
        });
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route path="/signin" component={SignInOutPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
