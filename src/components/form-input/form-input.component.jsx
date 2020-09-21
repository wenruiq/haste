import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, isSignUpInput, ...otherProps }) => (
  <div className="form-group">
    <input
      className={`form-input ${isSignUpInput ? 'form-input-sign-up' : ''}`}
      onChange={handleChange}
      {...otherProps}
    />
    {label ? (
      <label
        className={` form-input-label ${
          isSignUpInput ? 'form-input-label-sign-up' : ''
        } ${otherProps.value.length ? 'shrink' : ''}`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
