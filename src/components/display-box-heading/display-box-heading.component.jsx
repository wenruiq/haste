import React from 'react';

import './display-box-heading.styles.scss';

const DisplayBoxHeading = ({ title, isSimilarHeader=false }) => <div className='display-box-heading'>{title}</div>;
export default DisplayBoxHeading;
