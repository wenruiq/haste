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

		return (
			<div className='similar-results-display'>
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
