import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectProducts } from '../../redux/search/search.selectors';

import CardItem from '../../components/card-item/card-item.component';

import './search-results-display.styles.scss';

const SearchResultsDisplay = ({ products, type }) => {
	let selectedProducts = products[type];

	return (
		<div className='search-results-display'>
			{selectedProducts
				? selectedProducts.map((product) => (
						<CardItem key={product.name + product.id + Math.random()} {...product} />
				  ))
				: ''}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	products: selectProducts,
});

export default connect(mapStateToProps)(SearchResultsDisplay);


