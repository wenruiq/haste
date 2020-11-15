import SavedActionTypes from './saved.types';
import { removeItemFromSaved } from './saved.utils';

const INITIAL_STATE = {
  hidden: true,
  savedItems: [],
  isAdding: false,
  isDeleting: false,
  isFetching: false,
  errorMessage: undefined,
};

const savedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // *Toggle saved
    case SavedActionTypes.TOGGLE_SAVED_HIDDEN:
      return{
        ...state,
        hidden: !state.hidden
      };
    
    // *Set saved
    case SavedActionTypes.SET_SAVED:
      return {
        ...state,
        savedItems: action.payload,
      };

    // *Add saved
    case SavedActionTypes.ADD_SAVED_START:
      return {
        ...state,
        isAdding: true,
      };
    case SavedActionTypes.ADD_SAVED_SUCCESS:
      return {
        ...state,
        isAdding: false,
        savedItems: [...state.savedItems, action.payload],
      };
    case SavedActionTypes.ADD_SAVED_FAILURE:
      return {
        ...state,
        isAdding: false,
        errorMessage: action.payload,
      };

    // *Delete saved
    case SavedActionTypes.DELETE_SAVED_START:
      return {
        ...state,
        isDeleting: true,
      };
    case SavedActionTypes.DELETE_SAVED_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        savedItems: removeItemFromSaved(state.savedItems, action.payload),
      };
    case SavedActionTypes.DELETE_SAVED_FAILURE:
      return {
        ...state,
        isDeleting: false,
        errorMessage: action.payload,
      };

    // *Get saved
    case SavedActionTypes.FETCH_SAVED_START:
      return {
        ...state,
        isFetching: true,
      };
    case SavedActionTypes.FETCH_SAVED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        savedItems: [...state.savedItems, ...action.payload],
      };
    case SavedActionTypes.FETCH_SAVED_FAILURE:
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
