import { SearchActionTypes } from './search.types';

const INITIAL_STATE = {
	products: { query: [], recommended: [], popular: [] },
	isFetching: { query: false, recommended: false, popular: false },
	errorMessage: undefined,
};

const searchReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		//* For user search query
		case SearchActionTypes.FETCH_SEARCH_START:
			return {
				...state,
				isFetching: { ...state.isFetching, query: true },
			};

		case SearchActionTypes.FETCH_SEARCH_SUCCESS:
			return {
				...state,
				products: { ...state.products, query: action.payload },
				isFetching: { ...state.isFetching, query: false },
			};

		case SearchActionTypes.FETCH_SEARCH_FAILURE:
			return {
				...state,
				isFetching: { ...state.isFetching, query: false },
				errorMessage: action.payload,
			};

		//* For home page recommended query
		case SearchActionTypes.FETCH_RECOMMENDED_START:
			return {
				...state,
				isFetching: { ...state.isFetching, recommended: true },
			};

		case SearchActionTypes.FETCH_RECOMMENDED_SUCCESS:
			return {
				...state,
				products: { ...state.products, recommended: action.payload },

				isFetching: { ...state.isFetching, recommended: false },
			};

		case SearchActionTypes.FETCH_RECOMMENDED_FAILURE:
			return {
				...state,
				isFetching: { ...state.isFetching, recommended: false },
				errorMessage: action.payload,
			};

		//* For home page popular query
		case SearchActionTypes.FETCH_POPULAR_START:
			return {
				...state,
				isFetching: { ...state.isFetching, popular: true },
			};

		case SearchActionTypes.FETCH_POPULAR_SUCCESS:
			return {
				...state,
				products: { ...state.products, popular: action.payload },

				isFetching: { ...state.isFetching, popular: false },
			};

		case SearchActionTypes.FETCH_POPULAR_FAILURE:
			return {
				...state,
				isFetching: { ...state.isFetching, popular: false },
				errorMessage: action.payload,
			};

		default:
			return state;
	}
};

export default searchReducer;
