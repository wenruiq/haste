import { SearchActionTypes } from './search.types';

const INITIAL_STATE = {
	products: [],
	isFetching: false,
	errorMessage: undefined,
};

const searchReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SearchActionTypes.FETCH_SEARCH_START:
			return {
				...state,
				isFetching: true,
			};

		case SearchActionTypes.FETCH_SEARCH_SUCCESS:
			return {
				...state,
				products: action.payload,
				isFetching: false,
			};

		case SearchActionTypes.FETCH_SEARCH_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};

		default:
			return state;
	}
};

export default searchReducer;
