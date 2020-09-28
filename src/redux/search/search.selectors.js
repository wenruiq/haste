import { createSelector } from 'reselect';

const selectSearch = (state) => state.search;

const selectProducts = createSelector([selectSearch], (search) => search.products);
const selectQuery = createSelector([selectSearch], (search) => search.products.query);
const selectRecommended = createSelector([selectSearch], (search) => search.products.recommended);
const selectPopular = createSelector([selectSearch], (search) => search.products.popular);

// const selectProductsData = createSelector([selectProducts], (products) => products.data);

//* Select products in the manner for card to display
// export const selectProductsOrganized = createSelector([selectProductsData], (products) =>
// 	products
// 		? products.map((product) => ({
// 				id: product.id,
// 				name: limitDescription(product.name),
// 				image: product.image,
// 				url: product.url,
// 				price: '$' + product.price,
// 				description: limitDescription(product.description, 40),
// 		  }))
// 		: []
// );

export const selectProductsOrganized = createSelector([selectProducts], (products) =>
	products
		? Object.keys(products).map((categories) =>
				products[categories].data
					? products[categories].data.map((product) => ({
							id: product.id,
							name: limitDescription(product.name),
							image: product.image,
							url: product.url,
							price: '$' + product.price,
							description: limitDescription(product.description, 40),
					  }))
					: []
		  )
		: []
);

//* Select n for number of products found in QUERY
export const selectQueryProductsCount = createSelector([selectQuery], (query) => {
	console.log(query);
	return query ? (query.limit > query.total ? query.total : query.limit) : 0;
});

//* Select n for number of products found in RECOMMENDED
export const selectRecommendedProductsCount = createSelector([selectRecommended], (products) =>
	products ? (products.limit > products.total ? products.total : products.limit) : 0
);

//* Select n for number of products found in POPULAR
export const selectPopularProductsCount = createSelector([selectPopular], (products) =>
	products ? (products.limit > products.total ? products.total : products.limit) : 0
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

// TODO: Find the optimal n for title & description
//* filter product primary description
const limitDescription = (description, limit = 29) => {
	// const shortenedDescription = [];

	if (description.length > limit) {
		return description.substring(0, limit - 5) + ' ...';
	}
	return description;
};
