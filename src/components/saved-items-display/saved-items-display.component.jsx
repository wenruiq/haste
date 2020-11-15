import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSavedItems } from '../../redux/saved/saved.selectors';

import CardItem from '../../components/card-item/card-item.component';

import './saved-items-display.styles.scss';

const SavedItemsDisplay = ({ savedItems }) => {
  return (
    <div className="saved-items-display">
      {savedItems
        ? savedItems.map(item => (
            <CardItem key={item.name + item.id} {...item} />
          ))
        : ''}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  savedItems: selectSavedItems,
});

export default connect(mapStateToProps)(SavedItemsDisplay);
