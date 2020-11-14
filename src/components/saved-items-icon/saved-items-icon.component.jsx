import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import BookmarksIcon from '@material-ui/icons/Bookmarks';
import './saved-items-icon.styles.scss';

class SavedItemsIcon extends React.Component {
  render() {
    return (
      <div className="saved-items-container">
        <div className="icon-container">
          <BookmarksIcon className="saved-items-icon" width="10%" />
          <span className="item-count-container">8</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>
  createStructuredSelector({ currentUser: selectCurrentUser });

export default connect(mapStateToProps, null)(SavedItemsIcon);
