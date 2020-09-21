import SavedActionTypes from './saved.types';

const INITIAL_STATE = {
  saved: [],
  isFetching: false,
  errorMessage: undefined,
};

const savedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SavedActionTypes.ADD_SAVED_START:
      return {
        ...state,
        isFetching: true,
      };
    case SavedActionTypes.ADD_SAVED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        saved: [...state.saved, action.payload],
      };
    case SavedActionTypes.ADD_SAVED_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default savedReducer;
