import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import DisplayBoxHeading from '../../components/display-box-heading/display-box-heading.component';
import SavedItemsDisplay from '../../components/saved-items-display/saved-items-display.component';

import { selectIsFetching, selectSavedCount } from '../../redux/saved/saved.selectors';

import { updateFindSimilarQuery } from '../../redux/search/search.actions';

import './saved-page.styles.scss';

const SavedItemsDisplayWithSpinner = WithSpinner(SavedItemsDisplay);

class SavedPage extends React.Component {
	componentDidMount() {
		const { updateFindSimilarQuery } = this.props;
		updateFindSimilarQuery({});
	}

	render() {
		const { isFetching, savedItemsCount } = this.props;

		return (
			<div className='saved-page-container'>
				{savedItemsCount ? (
					<DisplayBoxHeading title='Your Saved Products' />
				) : (
					<DisplayBoxHeading title='You did not save any products.' />
				)}
				<SavedItemsDisplayWithSpinner isLoading={isFetching} />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateFindSimilarQuery: (obj) => dispatch(updateFindSimilarQuery(obj)),
});

const mapStateToProps = createStructuredSelector({
	isFetching: selectIsFetching,
	savedItemsCount: selectSavedCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedPage);
