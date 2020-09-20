import React from 'react';
import SavedItems from '../saved-items-icon/saved-items-icon.component';

import { Link } from 'react-router-dom';

import './header-icons-container.styles.scss';

const HeaderIconsContainer = ({ currentUser, hidden }) => (
	<div className='header-icons-container'>
		{/* Use currentUser ? (render saved & logout ) : (render login) */}
		<SavedItems />
		<div className='welcome-message'>Welcome, Benjamin</div>
		<div className='divider'>|</div>
		<Link className='styled-link' to='/signin'>
			SIGN OUT
		</Link>
	</div>
);

export default HeaderIconsContainer;
