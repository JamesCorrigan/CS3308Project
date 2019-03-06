import * as actionType from '../actions/actionTypes';
const initialState = {
  loggingIn: false,
  loggedIn: false,
  user: null,
  errors: []
}
export default (state = {
  loading: false,
  success: false,
  errors: []
}, action) => {
  switch (action.type) {
    case actionType.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case actionType.LOGIN_FAILED:
      return {
        ...state,
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
