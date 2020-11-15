import SuggestActionTypes from './suggest.types';

const INITIAL_STATE = {
  consent: false,
  terms: [],
};

const suggestReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SuggestActionTypes.ADD_SUGGEST_TERM:
      return {
        ...state,
        terms: [...state.terms, action.payload],
      };

    case SuggestActionTypes.ACCEPT_SUGGEST_CONSENT:
      return {
        ...state,
        consent: true,
      };

    case SuggestActionTypes.REJECT_SUGGEST_CONSENT:
      return {
        ...state,
        consent: false,
      };

    default:
      return state;
  }
};

export default suggestReducer;
