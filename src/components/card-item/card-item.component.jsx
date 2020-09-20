import React from 'react';

import './card-item.styles.scss';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const CardItem = () => (
	<div className='card-item-container'>
		<div className='card-item'>
			<div className='brand-and-save-container'>
				{/* Brand and Save Icon Container - 10% */}
				<div className='brand-container'>
					<img src={require('../../assets/brands/shopee-logo.png')} />
				</div>
				<BookmarkBorderIcon className='save-item-icon' />
			</div>

			{/* Item Pic container - 50% */}
			<div className='item-pic-container'>
				<a href='https://www.google.com.sg' target='_blank'>
					<img src={require('../../assets/test-item-image.jpg')}></img>
				</a>
			</div>

			{/* Item Details Container - 40% */}
			<div className='item-details-container'>
				<div className='item-description-container'>
					<div className='item-description-primary'>Gray Polo Shirt</div>
					<div className='item-description-secondary'>
						Light gray shirt made with 100% cotton in China
					</div>
				</div>
				<div className='item-price'>$35.00</div>
			</div>

			{/* <BookmarkIcon /> */}
		</div>
	</div>
);

export default CardItem;
