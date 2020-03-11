import React from "react";

import "./sign-in-out-page.scss";

import SignIn from "../../components/sign-in/Sign-in";
import SignUp from "../../components/sigin-up/Sign-up";

const SignInOutPage = () => (
    <div className="sign-in-and-sign-out">
        <SignIn />
        <SignUp />
    </div>
);

export default SignInOutPage;
