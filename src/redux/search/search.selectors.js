import { createSelector } from 'reselect';

const selectSearch = (state) => state.search;

const selectProducts = createSelector([selectSearch], (search) => search.products);

const selectProductsData = createSelector([selectProducts], (products) => products.data);

//* Select products in the manner for card to display
export const selectProductsOrganized = createSelector([selectProductsData], (products) =>
	products
		? products.map((product) => ({
				id: product.id,
				name: limitDescription(product.name),
				image: product.image,
				url: product.url,
				price: '$' + product.price,
				description: limitDescription(product.description, 40),
		  }))
		: []
);

//* Select n for number of products found
export const selectProductsCount = createSelector([selectProducts], (products) =>
	products ? (products.limit > products.total ? products.total : products.limit) : 0
);

//* Check if ASYNC request is still in process
export const selectIsSearchFetching = createSelector([selectSearch], (search) => search.isFetching);

//* Functions to organize product info

// TODO: Find the optimal n for title & description
//* filter product primary description
const limitDescription = (description, limit = 29) => {
	const shortenedDescription = [];

	if (description.length > limit) {
		return description.substring(0, limit - 5) + ' ...';
	}
	return description;
};
