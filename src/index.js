import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import './scss/index.scss';
import App from './App';

ReactDOM.render(
  // *Provider from react-redux lib to provide redux store
  <Provider store={store}>
    {/* BrowserRouter from react-router-dom lib to provide routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
