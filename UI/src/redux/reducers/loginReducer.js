import * as actionType from '../actions/actionTypes';
const initialState = {
  loggingIn: false,
  loggedIn: false,
  user: null,
  errors: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        loggedIn: false,
        user: action.user
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingin: false,
        user: action.user
      };
    case actionType.LOGIN_FAILED:
      return {
        ...state,
        loggedIn: false,
        loggingIn: false,
        errors: [
          ...state.errors,
          {
            time: new Date(),
            error: action.response
          }
        ]
      };
    default:
      return {
        ...state
      }
  }
}
