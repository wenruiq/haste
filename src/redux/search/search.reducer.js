import { SearchActionTypes } from './search.types';

const INITIAL_STATE = {
	userSearchInput: '',
	findSimilarQuery: {},
	products: { similar: [], query: [], recommended: [], popular: [] },
	isFetching: { similar: false, query: false, recommended: false, popular: false },
	errorMessage: undefined,
};

const searchReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SearchActionTypes.UPDATE_FIND_SIMILAR_QUERY:
			return {
				...state,
				findSimilarQuery: action.payload,
			};

		case SearchActionTypes.FETCH_SIMILAR_START:
			return {
				...state,
				isFetching: { ...state.isFetching, similar: true },
			};

		case SearchActionTypes.FETCH_SIMILAR_SUCCESS:
			return {
				...state,
				products: { ...state.products, similar: action.payload },
				isFetching: { ...state.isFetching, similar: false },
			};

		case SearchActionTypes.FETCH_SIMILAR_FAILURE:
			return {
				...state,
				isFetching: { ...state.isFetching, similar: false },
				errorMessage: action.payload,
			};

		//* For user search query

		case SearchActionTypes.UPDATE_USER_SEARCH_INPUT:
			return {
				...state,
				userSearchInput: action.payload,
			};

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
				products: {
					...state.products,
					recommended: action.payload,
				},

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
				products: {
					...state.products,
					popular: action.payload,
				},

				isFetching: { ...state.isFetching, popular: false },
			};

		case SearchActionTypes.FETCH_POPULAR_FAILURE:
			return {
				...state,
				isFetching: { ...state.isFetching, popular: false },
				errorMessage: action.payload,
			};

		case SearchActionTypes.SORT_RESULTS_DISPLAY:
			return {
				...state,
				products: { ...state.products, query: action.payload },
			};

		default:
			return state;
	}
};

export default searchReducer;
