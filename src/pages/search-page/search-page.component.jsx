import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//* Components Import
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import DisplayBoxHeading from '../../components/display-box-heading/display-box-heading.component';
import SortingDropdown from '../../components/sorting-dropdown/sorting-dropdown.component';
import SearchResultsDisplay from '../../components/search-results-display/search-results-display.component';
import FindSimilarResultsDisplay from '../../components/find-similar-results-display/find-similar-results-display.component';

import {
	selectIsQuerySearchFetching,
	selectQueryProductsCount,
	selectUserSearchInput,
	selectFindSimilarQuery,
} from '../../redux/search/search.selectors';

import { updateFindSimilarQuery, fetchSearchStartAsync } from '../../redux/search/search.actions';

//* Import styling
import './search-page.styles.scss';

//* Wrap SearchResultsDisplay with Spinner HOC
const SearchResultsDisplayWithSpinner = WithSpinner(SearchResultsDisplay);
const FindSimilarResultsDisplayWithSpinner = WithSpinner(FindSimilarResultsDisplay);

class SearchPage extends Component {
	render() {
		const {
			findingSimilar,
			selectIsQuerySearchFetching,
			selectIsSimilarSearchFetching,
			productsCount,
			selectUserSearchInput,
		} = this.props;

		return (
			//? If productsCount > 0, render X products found. Else, if search is also not fetching, means that there's no products found for the search
			//? SearchResultsDisplayWithSpinner displays a spinner if still fetching, else displays the products
			<div className='search-page-container'>
				{findingSimilar ? (
					<div className='similar-results-wrapper'>
						<div className='similar-items-container'>
							<DisplayBoxHeading title='Similar Items' />
							<FindSimilarResultsDisplayWithSpinner
								type='similar'
								isLoading={selectIsSimilarSearchFetching}
							/>
						</div>
					</div>
				) : (
					''
				)}
				{productsCount && !selectIsQuerySearchFetching ? (
					<div className='search-page-sub-header-container'>
						<DisplayBoxHeading
							title={`${productsCount} products found for '${selectUserSearchInput}'`}
						/>
						<SortingDropdown className='sortBox' />
					</div>
				) : (
					selectIsQuerySearchFetching || (
						<DisplayBoxHeading title={`No Products Found for '${selectUserSearchInput}'`} />
					)
				)}
				<SearchResultsDisplayWithSpinner type='query' isLoading={selectIsQuerySearchFetching} />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateFindSimilarQuery: (term) => dispatch(updateFindSimilarQuery(term)),
	fetchSearchStartAsync: (term) => dispatch(fetchSearchStartAsync(term)),
});

const mapStateToProps = createStructuredSelector({
	selectIsQuerySearchFetching,
	selectUserSearchInput,
	productsCount: selectQueryProductsCount,
	findingSimilar: selectFindSimilarQuery,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
