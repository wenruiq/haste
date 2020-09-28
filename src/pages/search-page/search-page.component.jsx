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
	// fetch data from API
	componentDidMount() {
		const { fetchSearchStartAsync } = this.props;
		fetchSearchStartAsync();
	}

	render() {
		const { selectIsQuerySearchFetching, productsCount } = this.props;

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
