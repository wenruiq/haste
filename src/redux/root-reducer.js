import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import savedReducer from './saved/saved.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  saved: savedReducer,
});

export default rootReducer;
