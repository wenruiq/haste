import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectSavedHidden } from '../../redux/saved/saved.selectors';

import { auth } from '../../firebase/firebase.utils';

import SavedItemsIcon from '../saved-items-icon/saved-items-icon.component';
import SavedItemsDropdown from '../saved-items-dropdown/saved-items-dropdown.component';

import './header-icons-container.styles.scss';

const HeaderIconsContainer = ({ currentUser, hidden }) => (
  <div className="header-icons-container">
    {currentUser ? (
      <div className="saved-icon-container">
        <SavedItemsIcon />
        {hidden ? null : <SavedItemsDropdown />}
      </div>
    ) : null}

    {/* <div className="saved-icon-container">
      {currentUser ? <SavedItemsIcon /> : null}
      {hidden ? null : <SavedItemsDropdown />}
    </div> */}
    <div className="welcome-message">
      {currentUser ? `${currentUser.displayName}` : `Welcome to Haste !`}
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
  hidden: selectSavedHidden,
});

export default connect(mapStateToProps)(HeaderIconsContainer);
