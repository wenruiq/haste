import React, { Component } from 'react';

import SearchIcon from '@material-ui/icons/Search';

import './search-bar.styles.scss';

class SearchBar extends Component {
	// TODO: Link Search onSubmit with search results
	handleSubmit = (event) => {
		// event.preventDefault();
		// Code to handle when user hits search

		// dispatch event input to search page
		// Add query to search state
	};

	handleChange = (event) => {
		// Code to handle user input in search bar
	};

	render() {
		return (
			<form className='search-bar' onSubmit={this.handleSubmit}>
				<div className='search-input'>
					<input placeholder='Search in Haste' />
					<button type='submit' className='search-button'>
						<SearchIcon className='search-icon' />
					</button>
				</div>
			</form>
		);
	}
}

export default SearchBar;
