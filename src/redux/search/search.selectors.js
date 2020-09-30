import { createSelector } from 'reselect';

//? Structure of Search State is as follows p.s. [a,b] means a or b can either at that level of the state

//* Query (AKA search made from the search bar)
//? state.search.products.query.{data object}

//* Recommended (AKA search made automatically in homepage under 'You Might Like')
//* Popular (AKA search made automatically in homepage under 'Popular')
//? state.search.products.[recommended, popular].{... index: {data}} <-- (nested data object)

const selectSearch = (state) => state.search;
const selectProducts = createSelector([selectSearch], (search) => search.products);

const selectQuery = createSelector([selectSearch], (search) => search.products.query);
const selectRecommended = createSelector([selectSearch], (search) => search.products.recommended);
const selectPopular = createSelector([selectSearch], (search) => search.products.popular);

//? This function parses the data retrieved from the API into a more readable array of data to be used to populate CardItems
//* Input: state.search.products
//* Output: [ ... {id, name, image, url, price, description} ] if there's data, [] if none

//? Process:
//? state.search.products is split into the 3 categories: query, recommended and popular
//? 'query' goes into the if block, 'recommended' and 'popular' into the else block

export const selectProductsOrganized = createSelector([selectProducts], (products) =>
	products
		? //? categories = 'query', 'popular' and 'recommended'
		  Object.keys(products).map((categories) => {
				if (categories === 'query') {
					if (products[categories].data) {
						return products[categories].data.map((product) => ({
							id: product.id,
							name: limitDescription(product.name),
							image: product.image,
							url: product.url,
							price: '$' + product.price,
							description: limitDescription(product.description, 40),
						}));
					} else {
						return [];
					}
				} else {
					//? currentProductsStore = { 0: {...data}, 1: {...data}, 2: {...data}, 3: {...data} }
					let currentProductsStore = products[categories];
					//? currentProductsStoreKeys = [0,1,2,3]
					let currentProductsStoreKeys = Object.keys(products[categories]);
					//? finalResult collects all the parsed data to be returned together as ONE array
					let finalResult = [];
					//? Only processes if there's results returned
					if (currentProductsStoreKeys.length > 0) {
						//? eCommerceSite are the items in [0,1,2,3], they are not named
						currentProductsStoreKeys.map((ecommerceSite) => {
							//? currentProductData = data of the {total, limit, skip, data} object
							let currentProductData = currentProductsStore[ecommerceSite].data;

							//? This combines all the data from one eCommerce site into 1 giant array of parsed data
							let combinedProductData = currentProductData.map((product) => ({
								name: limitDescription(product.name),
								image: product.image,
								url: product.url,
								price: '$' + product.price,
								description: limitDescription(product.description, 40),
							}));
							//? This adds the processed data from each eCommerce site into the combined array finalResult
							finalResult.push(...combinedProductData);
						});
					}
					return finalResult;
				}
		  })
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
const limitDescription = (description, limit = 26) => {
	// const shortenedDescription = [];

	if (description.length > limit) {
		return description.substring(0, limit - 5) + ' ...';
	}
	return description;
};
