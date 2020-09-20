import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './scss/App.scss';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';



class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
				</Switch>
			</div>
		);
	}
}

export default App;
