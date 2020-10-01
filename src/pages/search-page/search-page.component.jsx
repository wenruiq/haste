import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//* Components Import
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import DisplayBoxHeading from '../../components/display-box-heading/display-box-heading.component';
import SearchResultsDisplay from '../../components/search-results-display/search-results-display.component';

import {
	selectIsQuerySearchFetching,
	selectQueryProductsCount,
	selectUserSearchInput,
} from '../../redux/search/search.selectors';

//* Import styling
import './search-page.styles.scss';

//* Wrap SearchResultsDisplay with Spinner HOC
const SearchResultsDisplayWithSpinner = WithSpinner(SearchResultsDisplay);

const SearchPage = ({ selectIsQuerySearchFetching, productsCount, selectUserSearchInput }) => (
	//? If productsCount > 0, render X products found. Else, if search is also not fetching, means that there's no products found for the search
	//? SearchResultsDisplayWithSpinner displays a spinner if still fetching, else displays the products
	<div className='search-page-container'>
		{productsCount ? (
			<DisplayBoxHeading title={`${productsCount} products found for '${selectUserSearchInput}'`} />
		) : (
			selectIsQuerySearchFetching || (
				<DisplayBoxHeading title={`No Products Found for '${selectUserSearchInput}'`} />
			)
		)}
		<SearchResultsDisplayWithSpinner type='query' isLoading={selectIsQuerySearchFetching} />
	</div>
);

const mapStateToProps = createStructuredSelector({
	selectIsQuerySearchFetching,
	selectUserSearchInput,
	productsCount: selectQueryProductsCount,
});

export default connect(mapStateToProps)(SearchPage);
