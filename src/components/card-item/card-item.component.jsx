import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { addSavedStartAsync } from '../../redux/saved/saved.actions';

//* Import Logos as Modules
import Shopee from '../../assets/brands/shopee-logo.png';
import eBay from '../../assets/brands/ebay-logo.png';
import Lazada from '../../assets/brands/lazada-logo.png';

import './card-item.styles.scss';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
// *import BookmarkIcon from '@material-ui/icons/Bookmark';

class CardItem extends React.Component {
  handleSave = () => {
    const {
      id,
      name,
      description,
      price,
      image,
      url,
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
    };
    addSavedStartAsync(currentUser.id, productToBeAdded);
  };

  render() {
    const { name, description, price, image, url, currentUser } = this.props;
    const brands = [Shopee, eBay, Lazada];
    const randomedBrand = brands[Math.floor(Math.random() * brands.length)];
    return (
      <div className="card-item-container">
        <div className="card-item">
          <div className="brand-and-save-container">
            <div className="brand-container">
              <img src={randomedBrand} alt="product-img" />
            </div>
            {currentUser ? (
              <BookmarkBorderIcon
                className="save-item-icon"
                onClick={() => this.handleSave()}
              />
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

            <div className="item-price">{price || '$35.00'}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addSavedStartAsync: (userID, product) =>
    dispatch(addSavedStartAsync(userID, product)),
});

const mapStateToProps = state =>
  createStructuredSelector({
    currentUser: selectCurrentUser,
  });

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
