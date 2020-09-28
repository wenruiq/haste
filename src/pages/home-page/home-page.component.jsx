import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './home-page.styles.scss';

//* Components Import
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import DisplayBoxHeading from '../../components/display-box-heading/display-box-heading.component';
import SearchResultsDisplay from '../../components/search-results-display/search-results-display.component';

//* Redux Import
import {
	fetchPopularStartAsync,
	fetchRecommendedStartAsync,
} from '../../redux/search/search.actions';

import {
	selectIsPopularSearchFetching,
	selectIsRecommendedSearchFetching,
	selectRecommendedProductsCount,
	selectPopularProductsCount,
} from '../../redux/search/search.selectors';

const categories = { Recommended: 'You Might Like', Popular: 'Popular' };

//* Wrap SearchResultsDisplay with Spinner HOC
const SearchResultsDisplayWithSpinner = WithSpinner(SearchResultsDisplay);

class HomePage extends Component {
	componentDidMount() {
		const { fetchRecommendedStartAsync, fetchPopularStartAsync } = this.props;
		fetchRecommendedStartAsync();
		fetchPopularStartAsync();
	}

	render() {
		const loadingStatus = {
			Recommended: this.props.selectIsRecommendedSearchFetching,
			Popular: this.props.selectIsPopularSearchFetching,
		};

		return (
			<div className='home-page-container'>
				{Object.keys(categories).map((category) => (
					<>
						<DisplayBoxHeading title={categories[category]} />
						<SearchResultsDisplayWithSpinner
							type={category.toLowerCase()}
							isLoading={loadingStatus[category]}
						/>
					</>
				))}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	selectIsPopularSearchFetching,
	selectIsRecommendedSearchFetching,
	selectRecommendedProductsCount,
	selectPopularProductsCount,
});

const mapDispatchToProps = (dispatch) => ({
	fetchRecommendedStartAsync: () => dispatch(fetchRecommendedStartAsync()),
	fetchPopularStartAsync: () => dispatch(fetchPopularStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
