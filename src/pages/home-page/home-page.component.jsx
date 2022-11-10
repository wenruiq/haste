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
	updateFindSimilarQuery,
	fetchRecommendedStartAsync,
} from '../../redux/search/search.actions';

import {
	selectIsPopularSearchFetching,
	selectIsRecommendedSearchFetching,
	selectRecommendedProductsCount,
	selectPopularProductsCount,
} from '../../redux/search/search.selectors';

import { selectSuggestConsent, selectSuggestTerms } from '../../redux/suggest/suggest.selectors';

const categories = { recommended: 'You Might Like', popular: 'Popular' };

//* Wrap SearchResultsDisplay with Spinner HOC
const SearchResultsDisplayWithSpinner = WithSpinner(SearchResultsDisplay);

class HomePage extends Component {
	componentDidMount() {
		const {
			fetchRecommendedStartAsync,
			fetchPopularStartAsync,
			selectSuggestConsent,
			selectSuggestTerms,
			updateFindSimilarQuery,
		} = this.props;

		updateFindSimilarQuery({});

		if (selectSuggestConsent) {
			let userCookiesKeywords = this.shuffleCookieKeywords(selectSuggestTerms);

			fetchRecommendedStartAsync(...userCookiesKeywords.slice(0, 4));
		} else {
			fetchRecommendedStartAsync();
		}

		fetchPopularStartAsync();
	}

	shuffleCookieKeywords = (cookiesArr) => {
		let currentIndex = cookiesArr.length,
			temporaryValue,
			randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = cookiesArr[currentIndex];
			cookiesArr[currentIndex] = cookiesArr[randomIndex];
			cookiesArr[randomIndex] = temporaryValue;
		}

		return cookiesArr;
	};

	render() {
		const { isPopularFetching, isRecommendedFetching, selectSuggestTerms } = this.props;
		let stateChanger = selectSuggestTerms;
		stateChanger = Math.random();

		const loadingStatus = {
			recommended: isRecommendedFetching,
			popular: isPopularFetching,
		};

		//* Added to enable cors-anywhere when new user visits the demo
		(function() {
			var cors_api_host = 'cors-anywhere.herokuapp.com';
			var cors_api_url = 'https://' + cors_api_host + '/';
			var slice = [].slice;
			var origin = window.location.protocol + '//' + window.location.host;
			var open = XMLHttpRequest.prototype.open;
			XMLHttpRequest.prototype.open = function() {
					var args = slice.call(arguments);
					var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
					if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
							targetOrigin[1] !== cors_api_host) {
							args[1] = cors_api_url + args[1];
					}
					return open.apply(this, args);
			};
	})();

		return (
			<div className='home-page-container'>
				{Object.keys(categories).map((category, i) => (
					<React.Fragment key={category + i}>
						<DisplayBoxHeading title={categories[category]} />
						<SearchResultsDisplayWithSpinner
							key={category + i + stateChanger}
							type={category}
							isLoading={loadingStatus[category]}
						/>
					</React.Fragment>
				))}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isPopularFetching: selectIsPopularSearchFetching,
	isRecommendedFetching: selectIsRecommendedSearchFetching,
	selectRecommendedProductsCount,
	selectPopularProductsCount,
	selectSuggestConsent,
	selectSuggestTerms,
});

//TODO: Utilize cookies to make these 2 requests in the future
const mapDispatchToProps = (dispatch) => ({
	fetchRecommendedStartAsync: () => dispatch(fetchRecommendedStartAsync()),
	fetchPopularStartAsync: () => dispatch(fetchPopularStartAsync()),
	updateFindSimilarQuery: (obj) => dispatch(updateFindSimilarQuery(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
