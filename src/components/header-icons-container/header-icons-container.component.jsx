import React from 'react';
import SavedItems from '../saved-items/saved-items.component';

import {
	IconsContainer,
	NameContainer,
	OptionLink,
	OptionsDivider,
} from './header-icons-container.styles';

const HeaderIconsContainer = ({ currentUser, hidden }) => (
	<IconsContainer>
		{/* Use currentUser ? (render saved & logout ) : (render login) */}
		<SavedItems />
		<NameContainer>Welcome, Lifu</NameContainer>
		<OptionsDivider>|</OptionsDivider>
		<OptionLink to='/signin'>SIGN OUT</OptionLink>
	</IconsContainer>
);
export default HeaderIconsContainer;
