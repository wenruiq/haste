import React from 'react';
// SavedItem is a component to be written

import {
	SavedItemsDropdownContainer,
	SavedItemsContainer,
	EmptyMessageContainer,
	SavedItemsDropdownButton,
} from './saved-items-dropdown.styles';

// This is the toggle-able dropdown from SavedItemsIcon
const SavedItemsDropdown = () => (
	// Wrapper for the dropdown
	<SavedItemsDropdownContainer>
		{/* Div to display dropdown items */}
		<SavedItemsContainer>
			{/* Display list of items using .map */}
			{/* <SavedItem></SavedItem> */}
			{/* Display this message when nothing is saved */}
			<EmptyMessageContainer>There is nothing here</EmptyMessageContainer>
		</SavedItemsContainer>
		{/* Button to go to saved items page */}
		<SavedItemsDropdownButton></SavedItemsDropdownButton>
	</SavedItemsDropdownContainer>
);

export default SavedItemsDropdown;
