import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignIn extends React.Component {
  state = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  render() {
    return (
      <div className="sign-up-container">
        <div className="sign-up-title">Do not have an account?</div>
        <span className="sign-up-sub-title">
          Sign up with your email and password
        </span>

        <form className="sign-up-form-card">
          <FormInput
            name="displayName"
            type="text"
            handleChange={this.handleChange}
            value={this.state.displayName}
            label="Display Name"
            isSignUpInput
            required
          />
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="Email"
            isSignUpInput
            required
          />
          <FormInput
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.password}
            label="Password"
            isSignUpInput
            required
          />
          <FormInput
            name="confirmPassword"
            type="password"
            handleChange={this.handleChange}
            value={this.state.confirmPassword}
            label="Confirm Password"
            isSignUpInput
            required
          />
          <CustomButton type="submit" isSignUpButton>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignIn;
