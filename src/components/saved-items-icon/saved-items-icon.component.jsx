import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { toggleSavedHidden } from '../../redux/saved/saved.actions';
import { selectSavedCount } from '../../redux/saved/saved.selectors';

import BookmarksIcon from '@material-ui/icons/Bookmarks';
import './saved-items-icon.styles.scss';

class SavedItemsIcon extends React.Component {
  render() {
    const { savedItemsCount, toggleSavedHidden } = this.props;
    return (
      <div className="saved-items-container">
        <div className="icon-container" onClick={toggleSavedHidden}>
          <BookmarksIcon className="saved-items-icon" width="10%" />
          <span
            className={`item-count-container${savedItemsCount > 9 ? '-2' : ''}`}
          >
            {savedItemsCount}
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleSavedHidden: () => dispatch(toggleSavedHidden()),
});

const mapStateToProps = state =>
  createStructuredSelector({
    currentUser: selectCurrentUser,
    savedItemsCount: selectSavedCount,
  });

export default connect(mapStateToProps, mapDispatchToProps)(SavedItemsIcon);
