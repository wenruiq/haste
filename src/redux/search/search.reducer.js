import { SearchActionTypes } from './search.types';

const INITIAL_STATE = {
	products: { query: {}, recommended: {}, popular: {} },
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
				products: {
					...state.products,
					//? This persists the product data that's already stored from other queries, as recommended & popular processes multiple queries
					recommended: {
						...state.products.recommended,
						//? This indexes multiple queries, can be improved to save as the eCommerce website in the future
						[Object.keys(state.products.recommended).length + 1]: action.payload,
					},
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
					//? This persists the product data that's already stored from other queries, as recommended & popular processes multiple queries
					popular: {
						...state.products.popular,
						//? This indexes multiple queries, can be improved to save as the eCommerce website in the future
						[Object.keys(state.products.popular).length + 1]: action.payload,
					},
				},

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
