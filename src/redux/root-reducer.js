import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import savedReducer from './saved/saved.reducer';
import searchReducer from './search/search.reducer';

const rootReducer = combineReducers({
	user: userReducer,
	saved: savedReducer,
	search: searchReducer,
});

export default rootReducer;
