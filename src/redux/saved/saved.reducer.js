import SavedActionTypes from './saved.types';

const INITIAL_STATE = {
  saved: [],
  isAdding: false,
  isFetching: false,
  errorMessage: undefined,
};

const savedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SavedActionTypes.ADD_SAVED_START:
      return {
        ...state,
        isAdding: true,
      };
    case SavedActionTypes.ADD_SAVED_SUCCESS:
      return {
        ...state,
        isAdding: false,
        saved: [...state.saved, action.payload],
      };
    case SavedActionTypes.ADD_SAVED_FAILURE:
      return {
        ...state,
        isAdding: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default savedReducer;
