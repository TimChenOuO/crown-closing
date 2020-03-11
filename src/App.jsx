import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/Homepage";
import ShopPage from "./pages/shoppage/ShopPage";
import SignInOutPage from "./pages/sign-in-out-page/Sign-in-out-page";

import Header from "./components/header/Header";

import { auth, createUserProfileDucoment } from "./firebase/firebase-utils";

class App extends React.Component {
    state = {
        currentUser: null
    };

    unSubscribeFromAuth = null;

    componentDidMount() {
        this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            // only display name, email, uid will be use in user obj that google auth provied
            // auth.onAuthStateChanged(async user){
            // createUserProfileDucoment(user);
            // console.log(user);
            // }
            if (userAuth) {
                const userRef = await createUserProfileDucoment(userAuth);
                userRef.onSnapshot(snapShop => {
                    this.setState(
                        {
                            currentUser: {
                                id: snapShop.id,
                                ...snapShop.data()
                            }
                        }
                        //, () => console.log(this.state)
                    );
                    console.log(this.state);
                });
            } else {
                this.setState({ currentUser: userAuth });
            }
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
