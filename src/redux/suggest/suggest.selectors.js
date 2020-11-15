import { createSelector } from 'reselect';

const selectSuggest = state => state.suggest;

export const selectSuggestTerms = createSelector(
  [selectSuggest],
  suggest => suggest.terms
);

export const selectSuggestConsent = createSelector(
  [selectSuggest],
  suggest => suggest.consent
);
