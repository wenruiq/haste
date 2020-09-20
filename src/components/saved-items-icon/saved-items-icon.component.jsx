import React from 'react';

import BookmarksIcon from '@material-ui/icons/Bookmarks';
import './saved-items-icon.styles.scss';

const SavedItemsIcon = ({ toggleDropdown }) => (
  <div className="saved-items-container" onClick={toggleDropdown}>
    <div className="icon-container">
      <BookmarksIcon className="saved-items-icon" width="10%"/>
      <span className="item-count-container">8</span>
    </div>
  </div>
);

export default SavedItemsIcon;
