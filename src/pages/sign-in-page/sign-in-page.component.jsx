import React from 'react';

// *import components
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

// *import css
import './sign-in-page.styles.scss';

// *functional component (returns jsx)
const SignInPage = () => (
  <div className="sign-in-sign-up-wrapper">
    <div className="sign-in-sign-up-container">
      <SignIn />
      <SignUp />
    </div>
  </div>
);

export default SignInPage;
