import React from 'react';

import LogoContainer from '../logo-container/logo-container.component';
import Search from '../search-bar/search-bar.component';
import HeaderIconsContainer from '../header-icons-container/header-icons-container.component';

import { Link } from 'react-router-dom';

import './header.styles.scss';

const Header = () => (
	<div className='header'>
		<div className='wrapper'>
			<Link to='/'>
				<LogoContainer />
			</Link>
			<Search />
			<HeaderIconsContainer />
		</div>
	</div>
);

export default Header;
