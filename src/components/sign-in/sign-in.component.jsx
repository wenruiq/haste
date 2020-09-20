import React from 'react';

import FormInput from '../form-input/form-input.component';

class SignIn extends React.Component {
  state = { email: '', password: '' };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in-container">
        <div className="sign-in-title">Already have an account?</div>
        <span>Sign in with your email and password</span>

        <form>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.password}
            label="password"
            required
          />
        </form>
      </div>
    );
  }
}

export default SignIn;
