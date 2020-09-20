import React from 'react';

import './four-item-display-box.styles.scss';

import CardItem from '../card-item/card-item.component';

const FourItemDisplayBox = () => (
	<div className='four-item-display-flexbox'>
		<CardItem />
		<CardItem />
		<CardItem />
		<CardItem />
	</div>
);

export default FourItemDisplayBox;
