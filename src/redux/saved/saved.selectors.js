import { createSelector } from 'reselect';

const selectSaved = state => state.saved;

export const selectSavedItems = createSelector(
  [selectSaved],
  saved => saved.savedItems
);

export const selectSavedHidden = createSelector(
  [selectSaved],
  saved => saved.hidden
);

export const selectSavedCount = createSelector(
  [selectSavedItems],
  savedItems => savedItems.length
);

export const selectIsFetching = createSelector(
  [selectSaved],
  saved => saved.isFetching
);
