import React from "react";
import { connect } from "react-redux";

import "./sign-up.scss";

import FormInput from "../form-input/Form-input";
import CustomButton from "../custom-button/Custom-button";

import { signUpStart } from "../../redux/user/user-action";

class SignUp extends React.Component {
    state = {
        displayName: "",
        email: "",
        password: "",
        confirmedPassword: "",
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { signUpStart } = this.props;
        const { displayName, email, password, confirmedPassword } = this.state;

        if (password !== confirmedPassword) {
            alert(
                "password is not match with confirmedPasswor, pleace try again"
            );
            return;
        }
        signUpStart({ email, displayName, password });
        // try {
        //     const { user } = await auth.createUserWithEmailAndPassword(
        //         email,
        //         password
        //     );
        //     await createUserProfileDucoment(user, { displayName });
        //     this.setState({
        //         displayName: "",
        //         email: "",
        //         password: "",
        //         confirmedPassword: ""
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
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

const mapDispatchToProps = (dispatch) => ({
    signUpStart: (user) => dispatch(signUpStart(user)),
});

export default connect(null, mapDispatchToProps)(SignUp);
