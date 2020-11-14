import axios from 'axios';

import { SearchActionTypes } from './search.types';

//* Import Mock API config & its utils
//? BestBuyAPI reference: http://haste-test-api.herokuapp.com/queries
import { GetFromBestBuyApi } from '../../api/best-buy-api';
import { GetFromEbayApi, endingParameters } from '../../api/ebay-api.js';
//* Import other APIs below
// ...

export const updateUserSearchInput = (input) => ({
	type: SearchActionTypes.UPDATE_USER_SEARCH_INPUT,
	payload: input,
});

//? Used for User Search from the Search Bar
export const fetchSearchStart = () => ({
	type: SearchActionTypes.FETCH_SEARCH_START,
});
export const fetchSearchSuccess = (result) => ({
	type: SearchActionTypes.FETCH_SEARCH_SUCCESS,
	payload: result,
});
export const fetchSearchFailure = (errorMessage) => ({
	type: SearchActionTypes.FETCH_SEARCH_FAILURE,
	payload: errorMessage,
});
//? Takes in an input of limit & query from the search bar
export const fetchSearchStartAsync = (query = '', limit = 25) => {
	return (dispatch) => {
		//* Indicate to state that search is running
		dispatch(fetchSearchStart());


		//* MultiQuery from two APIs
		axios
			.all([
				GetFromBestBuyApi.get(
					`/products?$limit=${limit}${query ? '&name[$like]=*' + query + '*' : ''}`
				),
				GetFromEbayApi.get(`/${endingParameters}&keywords=${query}`),
			])
			.then(
				//* Indicate to state that response has been received
				axios.spread((bestBuyApiData, eBayApiData) => {

					var eBayApiActualData = [];

					if (eBayApiData.data.findItemsByKeywordsResponse) {
						if (eBayApiData.data.findItemsByKeywordsResponse[0].searchResult) {
							eBayApiActualData =
								eBayApiData.data.findItemsByKeywordsResponse[0].searchResult[0].item;
						}
					}

					//* Convert eBay API data to match bestbuy's
					let modifiedEBayData = eBayApiActualData.map((data) => {
						var id, name, price, image, url, description;

						if (data.itemId) {
							id = data.itemId[0];
						}

						if (data.title) {
							name = data.title[0];
						}

						if (data.sellingStatus) {
							if (data.sellingStatus[0].convertedCurrentPrice) {
								price = data.sellingStatus[0].convertedCurrentPrice[0].__value__;
							}
						}

						if (data.galleryURL) {
							image = data.galleryURL[0];
						}

						if (data.viewItemURL) {
							url = data.viewItemURL[0];
						}

						if (data.subtitle) {
							description = data.subtitle[0];
						}

						return {
							id,
							name,
							price,
							image,
							url,
							description,
						};
					});

					Array.prototype.push.apply(bestBuyApiData.data.data, modifiedEBayData);
					//* Updated products['query'] into an Array of Objects
					dispatch(fetchSearchSuccess(bestBuyApiData.data.data));
				})
			)
			.catch((errors) => {
				//* Indicate to state that an error occurred in the search
				dispatch(fetchSearchFailure(errors));
			});
	};
};

//* FETCH FOR 'YOU MIGHT LIKE' ON HOME PAGE
export const fetchRecommendedStart = () => ({
	type: SearchActionTypes.FETCH_RECOMMENDED_START,
});

export const fetchRecommendedSuccess = (result) => ({
	type: SearchActionTypes.FETCH_RECOMMENDED_SUCCESS,
	payload: result,
});

export const fetchRecommendedFailure = (errorMessage) => ({
	type: SearchActionTypes.FETCH_RECOMMENDED_FAILURE,
	payload: errorMessage,
});

export const fetchRecommendedStartAsync = (query = 'game', limit = 4) => {
	return (dispatch) => {
		//* Indicate to state that fetch for recommendation has started
		dispatch(fetchRecommendedStart());

		//* Multiple queries
		axios
			.all([
				//TODO: To be optimized accordingly for other APIs using cookies
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*${query}*`),
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*chair*`),
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*refrigerator*`),
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*macbook*`),
			])
			.then(
				axios.spread((obj1, obj2, obj3, obj4) => {
					dispatch(fetchRecommendedSuccess(obj1.data));
					dispatch(fetchRecommendedSuccess(obj2.data));
					dispatch(fetchRecommendedSuccess(obj3.data));
					dispatch(fetchRecommendedSuccess(obj4.data));
				})
			)
			.catch((errors) => {
				dispatch(fetchRecommendedFailure(errors));
			});
	};
};

//* FETCH FOR 'POPULAR' ON HOMEPAGE

export const fetchPopularStart = () => ({
	type: SearchActionTypes.FETCH_POPULAR_START,
});

export const fetchPopularSuccess = (result) => ({
	type: SearchActionTypes.FETCH_POPULAR_SUCCESS,
	payload: result,
});

export const fetchPopularFailure = (errorMessage) => ({
	type: SearchActionTypes.FETCH_POPULAR_FAILURE,
	payload: errorMessage,
});

export const fetchPopularStartAsync = (query = 'bike', limit = 4) => {
	return (dispatch) => {
		dispatch(fetchPopularStart());

		axios
			.all([
				//TODO: To be optimized accordingly for other APIs
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*${query}*`),
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*samsung*`),
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*oven*`),
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*dining*`),
			])
			.then(
				axios.spread((obj1, obj2, obj3, obj4) => {
					dispatch(fetchPopularSuccess(obj1.data));
					dispatch(fetchPopularSuccess(obj2.data));
					dispatch(fetchPopularSuccess(obj3.data));
					dispatch(fetchPopularSuccess(obj4.data));
				})
			)
			.catch((errors) => {
				dispatch(fetchPopularFailure(errors));
			});
	};
};

//! https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SECURITY-APPNAME=LifuHuan-haste-PRD-25007f986-39451291&SERVICE-VERSION=1.0.0&GLOBAL-ID=EBAY-SG&siteid=216&paginationInput.entriesPerPage=25&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=apple
