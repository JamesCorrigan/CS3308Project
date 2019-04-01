import { combineReducers } from 'redux';
import albumReducer from './albumReducer';
import loginReducer from './loginReducer';
import homeReducer from './homeReducer';
export default combineReducers({
  albumReducer,
  loginReducer,
  homeReducer
});
