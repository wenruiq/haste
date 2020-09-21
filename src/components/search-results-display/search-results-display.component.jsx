import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectProductsOrganized } from '../../redux/search/search.selectors';

import CardItem from '../../components/card-item/card-item.component';

import './search-results-display.styles.scss';

const SearchResultsDisplay = ({ products }) => {
	return (
		<div className='search-results-display'>
			{products.map((product) => (
				<CardItem key={product.id} {...product} />
			))}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	products: selectProductsOrganized,
});

export default connect(mapStateToProps)(SearchResultsDisplay);
