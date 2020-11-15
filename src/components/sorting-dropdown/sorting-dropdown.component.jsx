import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-select';

import { selectQuery } from '../../redux/search/search.selectors';
import { sortResultsDisplay } from '../../redux/search/search.actions';

import './sorting-dropdown.styles.scss';

const options = [
	{ label: 'Price (High to Low)', value: 'pricehighlow' },
	{ label: 'Price (Low to High)', value: 'pricelowhigh' },
	{ label: 'Popularity (High to Low)', value: 'popularityhighlow' },
	{ label: 'Popularity (Low to High)', value: 'popularitylowhigh' },
];

class SortingDropdown extends Component {
	onChangeInput = (value) => {
		let { sortResultsDisplay, queryData } = this.props;

		// console.log('THIS IS QUERY DATA IN SORTING DROPDOWN');
		// console.log(queryData);

		sortResultsDisplay(value.value, queryData);
	};

	render() {
		return (
			<div className='sorting-dropdown-container'>
				<Select onChange={this.onChangeInput} options={options} placeholder='Sort By' />
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	queryData: selectQuery,
});

const mapDispatchToProps = (dispatch) => ({
	sortResultsDisplay: (sortType, data) => dispatch(sortResultsDisplay(sortType, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortingDropdown);
