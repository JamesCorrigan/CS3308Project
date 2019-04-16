import { combineReducers } from 'redux';
import albumReducer from './albumReducer';
import loginReducer from './loginReducer';
import homeReducer from './homeReducer';
import vacationReducer from './vacationReducer';
export default combineReducers({
  albumReducer,
  loginReducer,
  homeReducer,
  vacationReducer
});
