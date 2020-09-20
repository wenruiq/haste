import React from 'react';

import { SavedItemsContainer, SavedItemsIcon, ItemCountContainer } from './saved-items-icon.style.jsx';

const SavedItems = ({ toggleDropdown }) => (
	<SavedItemsContainer onClick={toggleDropdown}>
		<SavedItemsIcon />
		{/* See if want to have this counter, change to prop later if using */}
		<ItemCountContainer>8</ItemCountContainer>
	</SavedItemsContainer>
);

export default SavedItems;
