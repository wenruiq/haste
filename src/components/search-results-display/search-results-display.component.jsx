import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectProductsOrganized } from '../../redux/search/search.selectors';

import CardItem from '../../components/card-item/card-item.component';

import './search-results-display.styles.scss';

const SearchResultsDisplay = ({ products, type }) => {
	const categories = ['query', 'recommended', 'popular'];

	const selectedProducts = products[categories.indexOf(type)];

	return (
		<div className='search-results-display'>
			{selectedProducts
				? selectedProducts.map((product) => (
						<CardItem key={product.name + product.id} {...product} />
				  ))
				: ''}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	products: selectProductsOrganized,
});

export default connect(mapStateToProps)(SearchResultsDisplay);
