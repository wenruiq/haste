import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchSavedStartAsync } from './redux/saved/saved.actions';

import './scss/App.scss';

import Header from './components/header/header.component';
import HomePage from './pages/home-page/home-page.component';
import SearchPage from './pages/search-page/search-page.component';
import SignInPage from './pages/sign-in-page/sign-in-page.component';
import SavedPage from './pages/saved-page/saved-page.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;
  unsubscribeFromSaved = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(async snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });

          // *Perform subscribe to saved items when auth completes
          const { currentUser } = this.props;
          if (currentUser.id) {
            const {fetchSavedStartAsync} = this.props;
            console.log(`Current user id done: ${currentUser.id}`)
            fetchSavedStartAsync(currentUser.id);
            console.log("haha");
          }
        });
      }
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
  fetchSavedStartAsync: userID => dispatch(fetchSavedStartAsync(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
