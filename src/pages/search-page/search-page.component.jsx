import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//* Components Import
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import DisplayBoxHeading from '../../components/display-box-heading/display-box-heading.component';
import SortingDropdown from '../../components/sorting-dropdown/sorting-dropdown.component';
import SearchResultsDisplay from '../../components/search-results-display/search-results-display.component';
import FindSimilarResultsDisplay from '../../components/find-similar-results-display/find-similar-results-display.component';

import { fetchSimilarStartAsync } from '../../redux/search/search.actions';

import {
	selectIsQuerySearchFetching,
	selectQueryProductsCount,
	selectUserSearchInput,
	selectFindSimilarQuery,
} from '../../redux/search/search.selectors';

//* Import styling
import './search-page.styles.scss';

//* Wrap SearchResultsDisplay with Spinner HOC
const SearchResultsDisplayWithSpinner = WithSpinner(SearchResultsDisplay);
const FindSimilarResultsDisplayWithSpinner = WithSpinner(FindSimilarResultsDisplay);

class SearchPage extends Component {
	componentDidMount() {
		const { originalObj } = this.props;

		if (originalObj) {
			fetchSimilarStartAsync(originalObj);
		}
	}

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
					<>
						<DisplayBoxHeading title='Similar Items' />
						<FindSimilarResultsDisplayWithSpinner
							type='similar'
							isLoading={selectIsSimilarSearchFetching}
						/>
					</>
				) : (
					''
				)}
				{productsCount ? (
					<div className='search-page-sub-header-container'>
						<DisplayBoxHeading
							title={`${productsCount} products found for '${selectUserSearchInput}'`}
						/>
						<SortingDropdown />
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

const mapStateToProps = createStructuredSelector({
	selectIsQuerySearchFetching,
	selectUserSearchInput,
	productsCount: selectQueryProductsCount,
	findingSimilar: selectFindSimilarQuery,
});

export default connect(mapStateToProps)(SearchPage);
