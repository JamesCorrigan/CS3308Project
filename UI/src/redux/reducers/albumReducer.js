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
    case actionType.ACTION_CALL:
      return {
        ...state,
        loading: true
      };
    case actionType.CALL_RECIEVED:
      return {
        ...state,
        data: action.response
      };
    case actionType.CALL_FAILED:
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
