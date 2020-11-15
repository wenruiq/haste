import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SearchIcon from '@material-ui/icons/Search';

//* Redux Import
import {
	fetchSearchStartAsync,
	updateUserSearchInput,
	resetFindSimilarData,
	updateFindSimilarQuery,
} from '../../redux/search/search.actions';
import { selectUserSearchInput } from '../../redux/search/search.selectors';

import { addSuggestTerm } from '../../redux/suggest/suggest.actions';

import './search-bar.styles.scss';

class SearchBar extends Component {
	state = { userInput: '' };

	// TODO: Link Search onSubmit with search results
	handleSubmit = (event) => {
		event.preventDefault();

		const {
			fetchSearchStartAsync,
			history,
			updateUserSearchInput,
			addSuggestTerm,
			resetFindSimilarData,
			updateFindSimilarQuery,
		} = this.props;

		resetFindSimilarData();
		updateFindSimilarQuery({});

		//? Uses component state for search query but also update redux store about query so that search page will update accordingly
		const query = this.state.userInput;
		updateUserSearchInput(query);
		fetchSearchStartAsync(query);
		addSuggestTerm(query);
		history.push(`/search/${query}`);
	};

	handleChange = (event) => {
		event.preventDefault();
		//? Saves user input into component state
		this.setState({ userInput: event.target.value });
	};

	render() {
		return (
			<form className='search-bar' onSubmit={this.handleSubmit}>
				<div className='search-input'>
					<input placeholder='Search in Haste' onChange={this.handleChange} />
					<button type='submit' className='search-button'>
						<SearchIcon className='search-icon' />
					</button>
				</div>
			</form>
		);
	}
}

const mapStateToProps = () =>
	createStructuredSelector({
		selectUserSearchInput,
	});

const mapDispatchToProps = (dispatch) => ({
	fetchSearchStartAsync: (query) => dispatch(fetchSearchStartAsync(query)),
	updateUserSearchInput: (input) => dispatch(updateUserSearchInput(input)),
	addSuggestTerm: (term) => dispatch(addSuggestTerm(term)),
	resetFindSimilarData: (term) => dispatch(resetFindSimilarData(term)),
	updateFindSimilarQuery: () => dispatch(updateFindSimilarQuery()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
