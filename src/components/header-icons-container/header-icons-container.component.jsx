import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { auth } from '../../firebase/firebase.utils';

import SavedItemsIcon from '../saved-items-icon/saved-items-icon.component';

import './header-icons-container.styles.scss';

const HeaderIconsContainer = ({ currentUser, hidden }) => (
  <div className="header-icons-container">
    {currentUser ? <SavedItemsIcon /> : null}
    <div className="welcome-message">
      {currentUser ? `Welcome, Benjamin` : `Welcome to Haste !`}
    </div>
    <div className="divider"></div>
    {currentUser ? (
      <div className="styled-link" onClick={() => auth.signOut()}>
        SIGN OUT
      </div>
    ) : (
      <Link className="styled-link" to="/signin">
        SIGN IN
      </Link>
    )}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HeaderIconsContainer);
