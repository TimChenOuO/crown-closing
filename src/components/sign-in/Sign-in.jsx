import React from "react";
import { connect } from "react-redux";

import "./sign-in.scss";
// import { auth, signInWithGoogle } from "../../firebase/firebase-utils";
import {
    googleSignInStart,
    emailSignInStart
} from "../../redux/user/user-action";

import FormInput from "../form-input/Form-input";
import CustomButton from "../custom-button/Custom-button";

class SignIn extends React.Component {
    state = {
        email: "",
        password: ""
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        emailSignInStart(email, password);
        this.setState({ email: "", password: "" });
        // try {
        //     await auth.signInWithEmailAndPassword(email, password);
        //     this.setState({ email: "", password: "" });
        // } catch (error) {
        //     console.log(error);
        // }
    };

    handleChange = e => {
        // console.log(e.target);
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { googleSignInStart } = this.props;
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email & password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        label="Email"
                        required
                    />

                    <FormInput
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton
                            type="button"
                            onClick={googleSignInStart}
                            isGoogleSignIn
                        >
                            Sign In With Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);
