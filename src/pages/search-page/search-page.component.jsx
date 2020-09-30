import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//* Components Import
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import DisplayBoxHeading from '../../components/display-box-heading/display-box-heading.component';
import SearchResultsDisplay from '../../components/search-results-display/search-results-display.component';

//* Redux Import
import { fetchSearchStartAsync } from '../../redux/search/search.actions';
import {
	selectIsQuerySearchFetching,
	selectQueryProductsCount,
} from '../../redux/search/search.selectors';

//* Import styling
import './search-page.styles.scss';

//* Wrap SearchResultsDisplay with Spinner HOC
const SearchResultsDisplayWithSpinner = WithSpinner(SearchResultsDisplay);

class SearchPage extends Component {
	componentDidMount() {
		const { fetchSearchStartAsync } = this.props;
		//? fetch data from API
		//TODO: Use input from user search to make the request
		fetchSearchStartAsync();
	}

	render() {
		const { selectIsQuerySearchFetching, productsCount } = this.props;

		//? If productsCount > 0, render X products found. Else, if search is also not fetching, means that there's no products found for the search
		//? SearchResultsDisplayWithSpinner displays a spinner if still fetching, else displays the products
		return (
			<div className='search-page-container'>
				{productsCount ? (
					<DisplayBoxHeading title={`${productsCount} products found`} />
				) : (
					selectIsQuerySearchFetching || <DisplayBoxHeading title='No Such Products Found' />
				)}
				<SearchResultsDisplayWithSpinner type='query' isLoading={selectIsQuerySearchFetching} />
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	selectIsQuerySearchFetching,
	productsCount: selectQueryProductsCount,
});

const mapDispatchToProps = (dispatch) => ({
	fetchSearchStartAsync: () => dispatch(fetchSearchStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
