import { SearchActionTypes } from './search.types';

//* Import Mock API config & its utils
import { GetFromBestBuyApi } from '../../api/best-buy-api';

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

// TODO: Create Search Attachments for flexible number of props and populate accordingly
export const fetchSearchStartAsync = () => {
	return (dispatch) => {
		dispatch(fetchSearchStart());

		// GetFromBestBuyApi.get('/products?name[$like]=*nike*').then(
		GetFromBestBuyApi.get('/products?$limit=100').then(
			(response) => {
				dispatch(fetchSearchSuccess(response.data));
			},
			(error) => {
				dispatch(fetchSearchFailure(error));
			}
		);
	};
};
