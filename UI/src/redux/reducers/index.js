import { combineReducers } from 'redux';
import countReducer from './countReducer';
import albumReducer from './albumReducer';
import loginReducer from './loginReducer';
import homeReducer from './homeReducer';
export default combineReducers({
  countReducer,
  albumReducer,
  loginReducer,
  homeReducer
});
