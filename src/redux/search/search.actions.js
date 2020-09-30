import axios from 'axios';

import { SearchActionTypes } from './search.types';

//* Import Mock API config & its utils
//? BestBuyAPI reference: http://haste-test-api.herokuapp.com/queries
import { GetFromBestBuyApi } from '../../api/best-buy-api';
//* Import other APIs below
// ...

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
export const fetchSearchStartAsync = (limit = 25, query = '') => {
	return (dispatch) => {
		//* Indicate to state that search is running
		dispatch(fetchSearchStart());

		GetFromBestBuyApi.get(
			`/products?$limit=${limit}${query ? '&name[$like]=*' + query + '*' : ''}`
		).then(
			//* Indicate to state that response has been received
			(response) => {
				dispatch(fetchSearchSuccess(response.data));
			},
			//* Indicate to state that an error occurred in the search
			(error) => {
				dispatch(fetchSearchFailure(error));
			}
		);
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

export const fetchRecommendedStartAsync = (limit = 4, query = 'game') => {
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

export const fetchPopularStartAsync = (limit = 4, query = 'bike') => {
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
