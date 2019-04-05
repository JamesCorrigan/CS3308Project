import * as actionType from '../actions/actionTypes';
const initialState = {
  loggingIn: false,
  loggedIn: false,
  user: {},
  family: {},
  errors: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        loggedIn: false,
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingin: false,
        user: action.response.data
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
    case actionType.REQUEST_CREATE_FAMILY:
      return {
        ...state,
        loggingIn: true,
        loggedIn: false
      };
    case actionType.CREATE_FAMILY_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        family: action.response.family,
        user: action.response.user
      };
    case actionType.CREATE_FAMILY_FAILED:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        errors: [
          ...state.errors,
          {
            time: new Date(),
            error: action.response
          }
        ]
      };
    case actionType.REQUEST_ADD_MEMBER:
      return {
        ...state,
        loggingIn: true,
        loggedIn: false
      }
    case actionType.ADD_MEMBER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        user: action.response.user
      }
    case actionType.ADD_MEMBER_FAILED:
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
      }
    default:
      return {
        ...state
      }
  }
}
