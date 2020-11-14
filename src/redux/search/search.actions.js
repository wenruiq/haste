import axios from 'axios';

import { SearchActionTypes } from './search.types';

//* Import BestBuyAPI & eBay API config & their utils
//? BestBuyAPI reference: http://haste-test-api.herokuapp.com/queries
import { GetFromBestBuyApi } from '../../api/best-buy-api';
import { GetFromEbayApi, endingParameters } from '../../api/ebay-api';

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

const convertBestBuyDataToOrganizedData = (dataset, keyword) => {
	return dataset.map((data) => {
		return {
			keyword,
			source: 'bestbuy',
			id: data.id,
			image: data.image,
			url: data.url,
			price: data.price,
			name: limitDescription(data.name),
			description: limitDescription(data.description, 40),
		};
	});
};

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
					var bestBuyApiActualData = [];
					var eBayApiActualData = [];

					if (bestBuyApiData) {
						if (bestBuyApiData.data) {
							bestBuyApiActualData = convertBestBuyDataToOrganizedData(
								bestBuyApiData.data.data,
								query
							);
						}
					}

					// console.log('This is filtered best buy data');
					// console.log(bestBuyApiActualData);

					if (eBayApiData.data.findItemsByKeywordsResponse) {
						if (eBayApiData.data.findItemsByKeywordsResponse[0].searchResult) {
							eBayApiActualData =
								eBayApiData.data.findItemsByKeywordsResponse[0].searchResult[0].item;
						}
					}

					console.log('This is ebay Actual data');
					console.log(eBayApiActualData);

					//* Convert eBay API data to match bestbuy's
					let modifiedEBayData = eBayApiActualData.map((data) => {
						var id, name, price, image, url, description;

						if (data.itemId) {
							id = data.itemId[0];
						}

						if (data.title) {
							name = limitDescription(data.title[0]);
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
						} else {
							if (data.primaryCategory) {
								if (data.primaryCategory[0].categoryName) {
									description = limitDescription(data.primaryCategory[0].categoryName[0], 40);
								}
							}
						}

						return {
							source: 'ebay',
							keyword: query,
							id,
							name,
							price,
							image,
							url,
							description,
						};
					});

					// console.log('This is filtered ebay data');
					// console.log(modifiedEBayData);

					Array.prototype.push.apply(bestBuyApiActualData, modifiedEBayData);
					//* Updated products['query'] into an Array of Objects
					dispatch(fetchSearchSuccess(bestBuyApiActualData));
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

//* Allow 4 query values based on cookie
//TODO: Change query to an array of keywords and use limit to forEach get query
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
					console.log('This is recommended query 1');
					console.log(obj1.data);

					let allResults = [
						convertBestBuyDataToOrganizedData(obj1.data.data, query)[0],
						convertBestBuyDataToOrganizedData(obj2.data.data, 'chair')[0],
						convertBestBuyDataToOrganizedData(obj3.data.data, 'refrigerator')[0],
						convertBestBuyDataToOrganizedData(obj4.data.data, 'macbook')[0],
					];

					dispatch(fetchRecommendedSuccess(allResults));
				})
			)
			.catch((errors) => {
				dispatch(fetchRecommendedFailure(errors));
			});
	};
};

//* FETCH FOR 'POPULAR' ON HOMEPAGE
//TODO: Pass in the most popular categories, sort by watch count, get the top item

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
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*android*`),
			])
			.then(
				axios.spread((obj1, obj2, obj3, obj4) => {
					let allResults = [
						convertBestBuyDataToOrganizedData(obj1.data.data, query)[0],
						convertBestBuyDataToOrganizedData(obj2.data.data, 'samsung')[0],
						convertBestBuyDataToOrganizedData(obj3.data.data, 'oven')[0],
						convertBestBuyDataToOrganizedData(obj4.data.data, 'android')[0],
					];

					dispatch(fetchPopularSuccess(allResults));
				})
			)
			.catch((errors) => {
				dispatch(fetchPopularFailure(errors));
			});
	};
};

const limitDescription = (description, limit = 26) => {
	if (description) {
		if (description.length > limit) {
			return description.substring(0, limit - 5) + ' ...';
		}
	}
	return description;
};

//! https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SECURITY-APPNAME=LifuHuan-haste-PRD-25007f986-39451291&SERVICE-VERSION=1.0.0&GLOBAL-ID=EBAY-SG&siteid=216&paginationInput.entriesPerPage=25&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=apple
