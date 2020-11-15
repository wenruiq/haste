import SuggestActionTypes from './suggest.types';

export const acceptSuggestConsent = () => ({
  type: SuggestActionTypes.ACCEPT_SUGGEST_CONSENT,
});

export const rejectSuggestConsent = () => ({
  type: SuggestActionTypes.REJECT_SUGGEST_CONSENT,
});


export const addSuggestTerm = term => ({
  type: SuggestActionTypes.ADD_SUGGEST_TERM,
  payload: term,
});


