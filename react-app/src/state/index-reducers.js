import { combineReducers } from 'redux';
import contentReducer from './Azure/reducer';
import authReducer from './Auth/reducer';
import uiReducer from './UI/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';


const AppReducer = combineReducers({
  content: contentReducer,
  auth: authReducer,
  ui: uiReducer,
  loadingBar: loadingBarReducer,

});

const rootReducer = (state, action) => {
  return AppReducer(state, action);
}

export default rootReducer;
