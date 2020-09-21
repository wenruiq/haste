import React from 'react';

import './home-page.styles.scss';

import DisplayBoxHeading from '../../components/display-box-heading/display-box-heading.component';

import FourItemDisplayBox from '../../components/four-item-display-box/four-item-display-box.component';

import TestPage from '../test-page/test-page.component';

const HomePage = () => (
	<div className='home-page-container'>
		<DisplayBoxHeading title='Popular' />
		<FourItemDisplayBox />
		<TestPage />
		<DisplayBoxHeading title='You Might Like' />
		<FourItemDisplayBox />
	</div>
);

export default HomePage;
