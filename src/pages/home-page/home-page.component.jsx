import React from 'react';

import './home-page.styles.scss';

import DisplayBoxHeading from '../../components/display-box-heading/display-box-heading.component';

import FourItemDisplayBox from '../../components/four-item-display-box/four-item-display-box.component';

import TestPage from '../test-page/test-page.component';

const HomePage = () => (
	// Homepage make a fetch for 4 random items for popular & you might like
	<div className='home-page-container'>
		<DisplayBoxHeading title='You Might Like' />
		<FourItemDisplayBox />
		<TestPage />
		<DisplayBoxHeading title='Popular' />
		<FourItemDisplayBox />
	</div>
);

export default HomePage;
