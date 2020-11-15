import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import DisplayBoxHeading from '../../components/display-box-heading/display-box-heading.component';
import SavedItemsDisplay from '../../components/saved-items-display/saved-items-display.component';

import {
  selectIsFetching,
  selectSavedCount,
} from '../../redux/saved/saved.selectors';

import './saved-page.styles.scss';

const SavedItemsDisplayWithSpinner = WithSpinner(SavedItemsDisplay);

const SavedPage = ({ isFetching, savedItemsCount }) => (
  <div className="saved-page-container">
    {savedItemsCount ? (
      <DisplayBoxHeading title="Your Saved Products" />
    ) : (
      <DisplayBoxHeading title="You did not save any products." />
    )}
    <SavedItemsDisplayWithSpinner isLoading={isFetching} />
  </div>
);

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetching,
  savedItemsCount: selectSavedCount,
});

export default connect(mapStateToProps)(SavedPage);
