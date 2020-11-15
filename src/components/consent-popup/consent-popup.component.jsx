import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';

import {
  acceptSuggestConsent,
  rejectSuggestConsent,
} from '../../redux/suggest/suggest.actions';

import './consent-popup.styles.scss';

const ConsentPopup = ({ acceptSuggestConsent, rejectSuggestConsent }) => {
  return (
    <div className="consent-container">
      <p>
        By using this site you agree to our{' '}
        <a href="http://www.google.com">Terms and conditions</a>, which includes
        the use of the browser's local storage.
      </p>
      <div className="consent-buttons">
        <CustomButton onClick={() => acceptSuggestConsent()}>
          Accept
        </CustomButton>
        <CustomButton onClick={() => rejectSuggestConsent()}>
          Reject
        </CustomButton>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  acceptSuggestConsent: () => dispatch(acceptSuggestConsent()),
  rejectSuggestConsent: () => dispatch(rejectSuggestConsent()),
});

export default connect(null, mapDispatchToProps)(ConsentPopup);
