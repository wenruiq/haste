import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './scss/App.scss';

import Header from './components/header/header.component';
import ConsentPopup from './components/consent-popup/consent-popup.component';
import HomePage from './pages/home-page/home-page.component';
import SearchPage from './pages/search-page/search-page.component';
import SignInPage from './pages/sign-in-page/sign-in-page.component';
import SavedPage from './pages/saved-page/saved-page.component';

import { auth, createUserProfileDocument, firestore } from './firebase/firebase.utils';

import { updateUserSearchInput, updateFindSimilarQuery } from './redux/search/search.actions';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { fetchSavedStartAsync, setSaved } from './redux/saved/saved.actions';
import { selectSuggestConsent } from './redux/suggest/suggest.selectors';

//* Added to enable cors-anywhere when new user visits the demo
(() => {
	let cors_api_host = 'cors-anywhere.herokuapp.com';
	let cors_api_url = 'https://' + cors_api_host + '/';
	let slice = [].slice;
	let origin = window.location.protocol + '//' + window.location.host;
	let open = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function() {
			let args = slice.call(arguments);
			/*eslint-disable no-useless-escape*/
			let targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
			/*eslint-enable */
			if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
					targetOrigin[1] !== cors_api_host) {
					args[1] = cors_api_url + args[1];
			}
			return open.apply(this, args);
	};
})();

// *Class based component
class App extends React.Component {
	unsubscribeFromAuth = null;

	// *Mounting of header + whatever page below
	componentDidMount() {
		// *Get actions from redux state
		const {
			setCurrentUser,
			fetchSavedStartAsync,
		} = this.props;



		// *Subscribe to auth
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			// *If user logged in
			if (userAuth) {
				// *Create user document in firebase on first login
				// *userRef is firestore.doc(`users/${userAuth.uid}`);
				const userRef = await createUserProfileDocument(userAuth);
        
        // *onSnapshot listens to userRef
				userRef.onSnapshot(async (snapShot) => {
					// *Put user data into state
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					});

					// *Using selector, get currentUserID from props
					const {
						currentUser: { id: currentUserID },
					} = this.props;

					// *Fetch saved products
					fetchSavedStartAsync(currentUserID);

					// *Listen to saved products onSnapShot
					const savedRef = firestore.collection(`users/${currentUserID}/saved`);
					savedRef.onSnapshot(async (snapShot) => {
						const savedItems = [];
						snapShot.forEach((doc) => {
							savedItems.push(doc.data());
						});
						setSaved(savedItems);
					});
				});
			}
			// *If not logged in, setCurrentUser to null
			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		const { suggestConsent } = this.props;
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/search/:userInput' component={SearchPage} />
					<Route
						exact
						path='/signin'
            render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignInPage />)}
            
					/>
					<Route exact path='/saved' component={SavedPage} />
				</Switch>
				{suggestConsent ? null : <ConsentPopup />}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	suggestConsent: selectSuggestConsent,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
	setSaved: (savedItems) => dispatch(setSaved(savedItems)),
	fetchSavedStartAsync: (userID) => dispatch(fetchSavedStartAsync(userID)),
	updateUserSearchInput: (keyword) => dispatch(updateUserSearchInput(keyword)),
	updateFindSimilarQuery: (originalObj) => dispatch(updateFindSimilarQuery(originalObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
