import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectProducts, selectFindSimilarQuery } from '../../redux/search/search.selectors';

import CardItem from '../card-item/card-item.component';

import './find-similar-results-display.styles.scss';

class FindSimilarResultsDisplay extends Component {
	render() {
		const { products } = this.props;

		let selectedProducts = products['similar'];

		console.log('I tried to render as FindSimilarResults Display');
		console.log('This is selected products');
		console.log(selectedProducts);

		return (
			<div className='search-results-display'>
				{selectedProducts
					? selectedProducts
							.filter((item) => item !== undefined && item !== {})
							.map((product) => (
								<CardItem key={product.name + product.id + Math.random()} {...product} />
							))
					: ''}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	products: selectProducts,
	query: selectFindSimilarQuery,
});

export default connect(mapStateToProps)(FindSimilarResultsDisplay);
