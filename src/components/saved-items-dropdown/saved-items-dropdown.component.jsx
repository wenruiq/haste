import React from 'react';
// SavedItem is a component to be written

// This is the toggle-able dropdown from SavedItemsIcon
const SavedItemsDropdown = () => (
	//* Wrapper for the dropdown
	<div className="saved-items-dropdown-container">
		{/* //*Div to display dropdown items  */}
		<div className="saved-items-container">
		{/* //*Display list of <SavedItems></SavedItems> using .map
		//* Display this message when nothing is saved */}
			<div className="empty-message-container">
				There is nothing here
			</div>
		</div>
		{/* //* Button to access saved items */}
		<a className="saved-items-dropdown-button"></a>
	</div>
);

export default SavedItemsDropdown;
