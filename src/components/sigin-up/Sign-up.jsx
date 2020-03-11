import React from "react";

import "./sign-up.scss";

import { auth, createUserProfileDucoment } from "../../firebase/firebase-utils";
import FormInput from "../form-input/Form-input";
import CustomButton from "../custom-button/Custom-button";

class SignUp extends React.Component {
    state = {
        displayName: "",
        email: "",
        password: "",
        confirmedPassword: ""
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { displayName, email, password, confirmedPassword } = this.state;

        if (password !== confirmedPassword) {
            alert(
                "password is not match with confirmedPasswor, pleace try again"
            );
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            await createUserProfileDucoment(user, { displayName });
            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmedPassword: ""
            });
        } catch (error) {
            console.log(error);
        }
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        const { displayName, email, password, confirmedPassword } = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I don't have an account</h2>
                <span>Sign up with email & password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={this.handleChange}
                        label="Display Name"
                        required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmedPassword"
                        value={confirmedPassword}
                        onChange={this.handleChange}
                        label="Confirmed Password"
                        required
                    />
                    <CustomButton type="submit">Sign up</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;
