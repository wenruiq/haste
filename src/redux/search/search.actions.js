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

export const updateFindSimilarQuery = (originalObj) => ({
	type: SearchActionTypes.UPDATE_FIND_SIMILAR_QUERY,
	payload: originalObj,
});

export const resetFindSimilarData = () => ({
	type: SearchActionTypes.RESET_FIND_SIMILAR_DATA,
	payload: [],
});

const updateSortResultsDisplay = (data) => ({
	type: SearchActionTypes.SORT_RESULTS_DISPLAY,
	payload: data,
});

export const sortResultsDisplay = (sortType, data) => {
	//* data from selector
	//* sortType can be ['default', 'pricehighlow', 'pricelowhigh', 'popularityhighlow', 'popularitylowhigh']

	return (dispatch) => {
		if (sortType === 'pricehighlow') {
			data.sort(function (a, b) {
				return b.price - a.price;
			});
		} else if (sortType === 'pricelowhigh') {
			data.sort(function (a, b) {
				return a.price - b.price;
			});
		} else if (sortType === 'popularityhighlow') {
			let eBayData = data.filter((item) => {
				return item.source === 'ebay';
			});

			let bestBuyData = data.filter((item) => {
				return item.source === 'bestbuy';
			});

			eBayData.sort(function (a, b) {
				return b.popularity - a.popularity;
			});

			Array.prototype.push.apply(eBayData, bestBuyData);
			data = eBayData;
		} else if (sortType === 'popularityhighlow') {
			let eBayData = data.filter((item) => {
				return item.source === 'ebay';
			});

			let bestBuyData = data.filter((item) => {
				return item.source === 'bestbuy';
			});

			eBayData.sort(function (a, b) {
				return a.popularity - b.popularity;
			});

			Array.prototype.push.apply(eBayData, bestBuyData);
			data = eBayData;
		}

		dispatch(updateSortResultsDisplay(data));
	};
};

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

const convertBestBuyDataToOrganizedData = (data, keyword) => {
	if (!data.description) {
		data.description = '';
	}

	return {
		keyword,
		source: 'bestbuy',
		id: data.id,
		image: data.image,
		url: data.url,
		price: data.price,
		name: data.name,
		shortenedName: limitDescription(data.name),
		description: data.description,
		shortenedDescription: limitDescription(data.description, 40),
	};
};

const convertEBayDataToOrganizedData = (data, keyword) => {
	var id, name, shortenedName, price, image, url, popularity, description, shortenedDescription;

	if (data.itemId) {
		id = data.itemId[0];
	}

	if (data.title) {
		name = data.title[0];
		shortenedName = limitDescription(data.title[0]);
	}

	if (data.listingInfo) {
		if (data.listingInfo[0].watchCount) {
			popularity = data.listingInfo[0].watchCount[0];
		} else {
			popularity = 0;
		}
	} else {
		popularity = 0;
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
		shortenedDescription = limitDescription(data.subtitle[0], 40);
	} else {
		if (data.primaryCategory) {
			if (data.primaryCategory[0].categoryName) {
				description = data.primaryCategory[0].categoryName[0];
				shortenedDescription = limitDescription(data.primaryCategory[0].categoryName[0], 40);
			} else {
				description = '';
				shortenedDescription = '';
			}
		} else {
			description = '';
			shortenedDescription = '';
		}
	}

	return {
		source: 'ebay',
		keyword,
		id,
		popularity,
		name,
		shortenedName,
		price,
		image,
		url,
		description,
		shortenedDescription,
	};
};

//? Takes in an input of limit & query from the search bar
export const fetchSearchStartAsync = (query = '', limit = 24) => {
	return async (dispatch) => {
		//* Indicate to state that search is running
		dispatch(fetchSearchStart());

		//* MultiQuery from two APIs
		axios
			.all([
				GetFromBestBuyApi.get(
					`/products?$limit=${limit}${query ? '&name[$like]=*' + query + '*' : ''}`
				),
				await GetFromEbayApi.get(
					`/${endingParameters}&paginationInput.entriesPerPage=${limit}&keywords=${query}`
				),
			])
			.then(
				//* Indicate to state that response has been received
				axios.spread((bestBuyApiData, eBayApiData) => {
					var bestBuyApiActualData = [];
					var eBayApiActualData = [];

					if (bestBuyApiData) {
						if (bestBuyApiData.data) {
							bestBuyApiData.data.data.forEach((data) => {
								bestBuyApiActualData.push(convertBestBuyDataToOrganizedData(data, query));
							});
						}
					}

					if (eBayApiData.data.findItemsByKeywordsResponse) {
						if (eBayApiData.data.findItemsByKeywordsResponse[0].searchResult) {
							eBayApiActualData =
								eBayApiData.data.findItemsByKeywordsResponse[0].searchResult[0].item;
						}
					}

					//* Convert eBay API data to match bestbuy's
					let modifiedEBayData = eBayApiActualData.map((data) =>
						convertEBayDataToOrganizedData(data, query)
					);
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
export const fetchRecommendedStartAsync = (
	query1 = 'ultraboost',
	query2 = 'napkin',
	query3 = 'dvd',
	query4 = 'zenbook'
) => {
	return async (dispatch) => {
		//* Indicate to state that fetch for recommendation has started
		dispatch(fetchRecommendedStart());

		//* Multiple queries
		axios
			.all([
				//TODO: Change to user's cookie's categories
				await GetFromEbayApi.get(
					`/${endingParameters}&sortOrder=BestMatch&paginationInput.entriesPerPage=1&keywords=${query1}`
				),
				await GetFromEbayApi.get(
					`/${endingParameters}&sortOrder=BestMatch&paginationInput.entriesPerPage=1&keywords=${query2}`
				),
				await GetFromEbayApi.get(
					`/${endingParameters}&sortOrder=BestMatch&paginationInput.entriesPerPage=1&keywords=${query3}`
				),
				await GetFromEbayApi.get(
					`/${endingParameters}&sortOrder=BestMatch&paginationInput.entriesPerPage=1&keywords=${query4}`
				),
			])
			.then(
				axios.spread((obj1, obj2, obj3, obj4) => {
					let queryTerms = [query1, query2, query3, query4];
					let allResults = [obj1, obj2, obj3, obj4];
					let allProcessedResults = [];

					allResults.forEach((result, index) => {
						if (result.data.findItemsByKeywordsResponse) {
							if (result.data.findItemsByKeywordsResponse[0].searchResult) {
								if (result.data.findItemsByKeywordsResponse[0].searchResult[0].item) {
									allProcessedResults.push(
										convertEBayDataToOrganizedData(
											result.data.findItemsByKeywordsResponse[0].searchResult[0].item[0],
											queryTerms[index]
										)
									);
								}
							}
						}
					});

					dispatch(fetchRecommendedSuccess(allProcessedResults));
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

export const fetchPopularStartAsync = (
	query1 = 'bike',
	query2 = 'samsung',
	query3 = 'oven',
	query4 = 'android'
) => {
	return async (dispatch) => {
		dispatch(fetchPopularStart());

		axios
			.all([
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*${query1}*`),
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*${query2}*`),
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*${query3}*`),
				GetFromBestBuyApi.get(`/products?$limit=${1}&name[$like]=*${query4}*`),
			])
			.then(
				axios.spread((obj1, obj2, obj3, obj4) => {
					let queryTerms = [query1, query2, query3, query4];
					let allResults = [obj1, obj2, obj3, obj4];
					let allProcessedResults = [];

					//* This is bestbuy foreach
					allResults.forEach((result, index) => {
						if (result.data.data) {
							allProcessedResults.push(
								convertBestBuyDataToOrganizedData(result.data.data[0], queryTerms[index])
							);
						}
					});

					dispatch(fetchPopularSuccess(allProcessedResults));
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

export const fetchSimilarStart = () => ({
	type: SearchActionTypes.FETCH_SIMILAR_START,
});
export const fetchSimilarSuccess = (result) => ({
	type: SearchActionTypes.FETCH_SIMILAR_SUCCESS,
	payload: result,
});
export const fetchSimilarFailure = (errorMessage) => ({
	type: SearchActionTypes.FETCH_SIMILAR_FAILURE,
	payload: errorMessage,
});

const getSimilarityIndex = (listOfOriginalNameWords, itemObject) => {
	let similarityScore, valueScore;

	let { popularity, name, description, price } = itemObject;

	const similarityMultiplier = 0.3;
	const valueMultiplier = 0.7;

	//* This is the similarity test
	//? PROCESS ORIGINAL ITEM INTO ARRAY OF WORDS
	let listOfNameWords = name.split(' ');
	let listOfDescriptionWords = description.split(' ');
	//? combine the two keywords array
	Array.prototype.push.apply(listOfNameWords, listOfDescriptionWords);

	//? filter out useless matches
	listOfNameWords.filter((value) => {
		return !['', ' ', '.', ','].includes(value);
	});

	let numberOfWordsMatched = listOfOriginalNameWords.filter((value) =>
		listOfNameWords.includes(value)
	).length;

	similarityScore = numberOfWordsMatched * similarityMultiplier;

	//* This is the value test
	parseInt(popularity) === 0 ? (popularity = 1) : (popularity = 0);

	valueScore = (popularity / price) * valueMultiplier;

	return valueScore + similarityScore;
};

export const fetchSimilarStartAsync = (originalObj) => {
	return async (dispatch) => {
		dispatch(fetchSimilarStart());

		await GetFromEbayApi.get(
			`/${endingParameters}&paginationInput.entriesPerPage=60&keywords=${originalObj.keyword}`
		)
			.then((response) => {
				let finalResult = [originalObj];

				let allProcessedResults = [];

				if (response.data.findItemsByKeywordsResponse) {
					if (response.data.findItemsByKeywordsResponse[0].searchResult) {
						if (response.data.findItemsByKeywordsResponse[0].searchResult[0].item) {
							response.data.findItemsByKeywordsResponse[0].searchResult[0].item.forEach((item) => {
								allProcessedResults.push(convertEBayDataToOrganizedData(item, originalObj.keyword));
							});
						}
					}
				}

				//* PROCESS ORIGINAL ITEM INTO ARRAY OF WORDS
				let listOfOriginalNameWords = originalObj.name.split(' ');
				let listOfOriginalDescriptionWords = originalObj.description.split(' ');
				//* combine the two keywords array
				Array.prototype.push.apply(listOfOriginalNameWords, listOfOriginalDescriptionWords);

				//* filter out useless matches
				listOfOriginalNameWords.filter((value) => {
					return !['', ' ', '.', ','].includes(value);
				});

				//* Filter for relevance (highest to lowest)
				allProcessedResults.sort((a, b) => {
					return (
						getSimilarityIndex(listOfOriginalNameWords, b) -
						getSimilarityIndex(listOfOriginalNameWords, a)
					);
				});

				let usedNames = [originalObj.name];
				if (allProcessedResults.length >= 3) {
					let limit = 0;

					allProcessedResults.forEach((item) => {
						if (limit < 3) {
							if (!usedNames.includes(item.name)) {
								finalResult.push(item);
								usedNames.push(item.name);
								limit += 1;
							}
						}
					});
				} else {
					Array.prototype.push.apply(finalResult, allProcessedResults);
				}

				dispatch(fetchSimilarSuccess(finalResult));
			})
			.catch((errors) => {
				dispatch(fetchSimilarFailure(errors));
			});
	};
};
