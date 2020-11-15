import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectSavedItems } from '../../redux/saved/saved.selectors';
import {
  addSavedStartAsync,
  deleteSavedStartAsync,
} from '../../redux/saved/saved.actions';

//* Import Logos as Modules
import BestBuy from '../../assets/brands/bestbuy-logo.png';
import eBay from '../../assets/brands/ebay-logo.png';

import './card-item.styles.scss';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkFilledIcon from '@material-ui/icons/Bookmark';

class CardItem extends React.Component {
  handleSave = () => {
    const {
      id,
      name,
      description,
      price,
      image,
      url,
      keyword,
      addSavedStartAsync,
      currentUser,
    } = this.props;

    const productToBeAdded = {
      id,
      name,
      description,
      price,
      image,
      url,
      keyword,
    };
    addSavedStartAsync(currentUser.id, productToBeAdded);
  };

  handleDelete = () => {
    const { id, currentUser, deleteSavedStartAsync } = this.props;
    deleteSavedStartAsync(currentUser.id, id);
  };

  render() {
    const {
      id,
      name,
      description,
      price,
      image,
      url,
      source,
      currentUser,
      savedItems,
    } = this.props;
    const isSaved = !!savedItems.find(item => item.id === id);

    return (
      <div className="card-item-container">
        <div className="card-item">
          <div className="brand-and-save-container">
            <div className="brand-container">
              <img src={source === 'ebay' ? eBay : BestBuy} alt="product-img" />
            </div>
            {currentUser ? (
              isSaved ? (
                <BookmarkFilledIcon
                  className="save-item-icon"
                  onClick={() => this.handleDelete()}
                />
              ) : (
                <BookmarkBorderIcon
                  className="save-item-icon"
                  onClick={() => this.handleSave()}
                />
              )
            ) : (
              ''
            )}
          </div>
          <div className="item-pic-container">
            <a href="/">
              <img src={image} alt="placeholder-alt-change-later"></img>
            </a>
          </div>
          <div className="item-pic-buttons">
            <a
              className="button"
              href="https://www.google.com.sg"
              target="_blank"
              rel="noopener noreferrer"
              alt="placeholder-alt"
            >
              Find Similar
            </a>
            <a
              className="button"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              alt="placeholder-alt"
            >
              View Details
            </a>
          </div>
          <div className="item-details-container">
            <div className="item-description-container">
              <div className="item-description-primary">
                {name || 'Gray Polo Shirt'}
              </div>
              <div className="item-description-secondary">
                {description ||
                  'Light gray shirt made with 100% cotton in China'}
              </div>
            </div>

						<div className='item-price'>{'$' + price || '$35.00'}</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
  addSavedStartAsync: (userID, product) =>
    dispatch(addSavedStartAsync(userID, product)),
  deleteSavedStartAsync: (userID, productID) =>
    dispatch(deleteSavedStartAsync(userID, productID)),
});

const mapStateToProps = state =>
  createStructuredSelector({
    savedItems: selectSavedItems,
    currentUser: selectCurrentUser,
  });

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
