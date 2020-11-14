import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// *We choose localStorage instead of sessionStorage for this app
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import savedReducer from './saved/saved.reducer';
import searchReducer from './search/search.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['saved', 'search'],
};

const rootReducer = combineReducers({
  user: userReducer,
  saved: savedReducer,
  search: searchReducer,
});

export default rootReducer;
// export default persistReducer(persistConfig, rootReducer);
