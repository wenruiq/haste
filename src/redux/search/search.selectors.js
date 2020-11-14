import { createSelector } from 'reselect';

//? Structure of Search State is as follows p.s. [a,b] means a or b can either at that level of the state

//* Query (AKA search made from the search bar)
//? state.search.products.query.[array of data objects]

//* Recommended (AKA search made automatically in homepage under 'You Might Like')
//* Popular (AKA search made automatically in homepage under 'Popular')
//? state.search.products.[recommended, popular].[array of data objects]

const selectSearch = (state) => state.search;
export const selectProducts = createSelector([selectSearch], (search) => search.products);

const selectQuery = createSelector([selectSearch], (search) => search.products.query);
const selectRecommended = createSelector([selectSearch], (search) => search.products.recommended);
const selectPopular = createSelector([selectSearch], (search) => search.products.popular);

export const selectUserSearchInput = createSelector(
	[selectSearch],
	(search) => search.userSearchInput
);

//* Select n for number of products found in QUERY
export const selectQueryProductsCount = createSelector([selectQuery], (products) => {
	return products ? products.length : 0;
});

//* Select n for number of products found in RECOMMENDED
export const selectRecommendedProductsCount = createSelector([selectRecommended], (products) =>
	products.length > 0 ? true : false
);

//* Select n for number of products found in POPULAR
export const selectPopularProductsCount = createSelector([selectPopular], (products) =>
	products.length > 0 ? true : false
);

//* Check if ASYNC request is still in process
export const selectIsQuerySearchFetching = createSelector(
	[selectSearch],
	(search) => search.isFetching.query
);
export const selectIsRecommendedSearchFetching = createSelector(
	[selectSearch],
	(search) => search.isFetching.recommended
);
export const selectIsPopularSearchFetching = createSelector(
	[selectSearch],
	(search) => search.isFetching.popular
);

//* Functions to organize product info
