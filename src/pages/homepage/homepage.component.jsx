import React from 'react';

import './homepage.styles.scss';

import DisplayBoxHeading from '../../components/display-box-heading/display-box-heading.component';

import FourItemDisplayBox from '../../components/four-item-display-box/four-item-display-box.component';

const HomePage = () => (
	<div className='home-page-container'>
		<DisplayBoxHeading title='Recommended' />
		<FourItemDisplayBox />
		<DisplayBoxHeading title='You Might Like' />
		<FourItemDisplayBox />
	</div>
);

export default HomePage;
