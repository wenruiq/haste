import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './scss/App.scss';

import Header from './components/header/header.component';
import HomePage from './pages/home-page/home-page.component';
import SearchPage from './pages/search-page/search-page.component';
import SignInPage from './pages/sign-in-page/sign-in-page.component';
import SavedPage from './pages/saved-page/saved-page.component';

import {
  auth,
  createUserProfileDocument,
  firestore,
} from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { fetchSavedStartAsync, setSaved } from './redux/saved/saved.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  // *Mounting of header + whatever page below
  componentDidMount() {
    // *Get actions from redux state
    const { setCurrentUser, fetchSavedStartAsync } = this.props;

    // *Subscribe to auth
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // *If user logged in
      if (userAuth) {
        // *Create user document in firebase on first login
        // *userRef is firestore.doc(`users/${userAuth.uid}`);
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(async snapShot => {
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
          savedRef.onSnapshot(async snapShot => {
            const savedItems = [];
            snapShot.forEach(doc => {
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
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/search/:userInput" component={SearchPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInPage />
            }
          />
          <Route exact path="/saved" component={SavedPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setSaved: savedItems => dispatch(setSaved(savedItems)),
  fetchSavedStartAsync: userID => dispatch(fetchSavedStartAsync(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
