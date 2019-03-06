import * as actionType from '../actions/actionTypes';
const initialState = {
  loading: false,
  success: false,
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
        loading: true
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        data: action.response
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
