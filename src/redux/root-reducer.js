import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// *We choose localStorage instead of sessionStorage for this app
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import savedReducer from './saved/saved.reducer';
import searchReducer from './search/search.reducer';
import suggestReducer from './suggest/suggest.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['search', 'suggest'],
};

const rootReducer = combineReducers({
  user: userReducer,
  saved: savedReducer,
  search: searchReducer,
  suggest: suggestReducer,
});

export default persistReducer(persistConfig, rootReducer);
