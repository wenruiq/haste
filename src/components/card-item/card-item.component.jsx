import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { addSavedStartAsync } from '../../redux/saved/saved.actions';

import './card-item.styles.scss';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
// *import BookmarkIcon from '@material-ui/icons/Bookmark';

class CardItem extends React.Component {
  handleSave = () => {
    const testProduct = {
      id: '3j1ddui31m',
      name: 'Big Bag',
      price: '$13.37',
      description: "big bag 300kg you can't handle for sure",
    };
    const { addSavedStartAsync, currentUser } = this.props;
    console.log(currentUser.id);
    addSavedStartAsync(currentUser.id, testProduct);
  };

  render() {
    return (
      <div className="card-item-container">
        <div className="card-item">
          <div className="brand-and-save-container">
            {/* Brand and Save Icon Container - 10% */}
            <div className="brand-container">
              <img
                src={require('../../assets/brands/shopee-logo.png')}
                alt="placeholder-alt-change-later"
              />
            </div>
            <BookmarkBorderIcon
              className="save-item-icon"
              onClick={() => this.handleSave()}
            />
          </div>

          {/* Item Pic container - 50% */}
          <div className="item-pic-container">
            <a>
              <img
                src={require('../../assets/test-item-image.jpg')}
                alt="placeholder-alt-change-later"
              ></img>
            </a>
          </div>

          <div className="item-pic-buttons">
            {/* //! Change to Link & API link respectively in the future*/}
            <a
              className="button"
              href="https://www.google.com.sg"
              target="_blank"
              alt="placeholder-alt-change-later"
            >
              Find Similar
            </a>
            <a
              className="button"
              href="https://www.google.com.sg"
              target="_blank"
              alt="placeholder-alt-change-later"
            >
              View Details
            </a>
          </div>

          {/* Item Details Container - 40% */}
          <div className="item-details-container">
            <div className="item-description-container">
              <div className="item-description-primary">Gray Polo Shirt</div>
              <div className="item-description-secondary">
                Light gray shirt made with 100% cotton in China
              </div>
            </div>
            <div className="item-price">$35.00</div>
          </div>

          {/* <BookmarkIcon /> */}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addSavedStartAsync: (userID, product) => dispatch(addSavedStartAsync(userID, product)),
});

const mapStateToProps = state =>
  createStructuredSelector({
    currentUser: selectCurrentUser,
  });

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
