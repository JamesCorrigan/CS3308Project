import { combineReducers } from 'redux';
import countReducer from './countReducer';
import albumReducer from './albumReducer';
export default combineReducers({
  countReducer,
  albumReducer
});
