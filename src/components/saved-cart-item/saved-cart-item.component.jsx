import React from 'react';

import './saved-cart-item.styles.scss';

const SavedCartItem = ({ savedItem: { shortenedName, name, price, image } }) => (
	<div className='saved-item'>
		<img src={image} alt='item' />
		<div className='item-details'>
			<span className='name'>{shortenedName ? shortenedName : name}</span>
			<span className='price'>${price}</span>
		</div>
	</div>
);

export default SavedCartItem;
