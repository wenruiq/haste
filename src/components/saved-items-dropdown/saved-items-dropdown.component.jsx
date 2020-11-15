import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import SavedCartItem from '../saved-cart-item/saved-cart-item.component';
import { selectSavedItems } from '../../redux/saved/saved.selectors';
import { toggleSavedHidden } from '../../redux/saved/saved.actions';

import './saved-items-dropdown.styles.scss';

const SavedItemsDropdown = ({ savedItems, history, dispatch }) => (
  <div className={`saved-dropdown ${savedItems.length ? '' : 'empty'}`}>
    <div className={`saved-items${savedItems.length ? '' : '-empty'}`}>
      {savedItems.length ? (
        savedItems.map(savedItem => (
          <SavedCartItem key={savedItem.id} savedItem={savedItem} />
        ))
      ) : (
        <span className="empty-message">Your saved list is empty</span>
      )}
    </div>
    {savedItems.length ? (
      <CustomButton
        onClick={() => {
          history.push('/saved');
          dispatch(toggleSavedHidden());
        }}
      >
        View Full List
      </CustomButton>
    ) : null}
  </div>
);

const mapStateToProps = createStructuredSelector({
  savedItems: selectSavedItems,
});

export default withRouter(connect(mapStateToProps)(SavedItemsDropdown));
