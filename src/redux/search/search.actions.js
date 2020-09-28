import { SearchActionTypes } from './search.types';

//* Import Mock API config & its utils
import { GetFromBestBuyApi } from '../../api/best-buy-api';

//* USER SEARCH

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

export const fetchSearchStartAsync = (limit = 25, query = '') => {
	return (dispatch) => {
		dispatch(fetchSearchStart());

		// GetFromBestBuyApi.get('/products?name[$like]=*nike*').then(
		GetFromBestBuyApi.get(
			`/products?$limit=${limit}${query ? '&name[$like]=*' + query + '*' : ''}`
		).then(
			(response) => {
				dispatch(fetchSearchSuccess(response.data));
			},
			(error) => {
				dispatch(fetchSearchFailure(error));
			}
		);
	};
};

//* FETCH RECOMMENDED ON HOME PAGE
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
		dispatch(fetchRecommendedStart());

		// GetFromBestBuyApi.get('/products?name[$like]=*nike*').then(
		GetFromBestBuyApi.get(
			`/products?$limit=${limit}${query ? '&name[$like]=*' + query + '*' : ''}`
		).then(
			(response) => {
				dispatch(fetchRecommendedSuccess(response.data));
			},
			(error) => {
				dispatch(fetchRecommendedFailure(error));
			}
		);
	};
};

//* FETCH POPULAR ON HOMEPAGE

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

		console.log(
			'Request is sent to ' +
				`/products?$limit=${limit}${query ? '&name[$like]=*' + query + '*' : ''}`
		);

		// GetFromBestBuyApi.get('/products?name[$like]=*nike*').then(
		GetFromBestBuyApi.get(
			`/products?$limit=${limit}${query ? '&name[$like]=*' + query + '*' : ''}`
		).then(
			(response) => {
				dispatch(fetchPopularSuccess(response.data));
			},
			(error) => {
				dispatch(fetchPopularFailure(error));
			}
		);
	};
};
