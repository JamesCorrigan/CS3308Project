import * as actionType from '../actions/actionTypes';
const initialState = {
  loading: false,
  calendar: [],
  errors: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.REQUEST_LOAD_CALENDAR:
      return {
        ...state,
        loading: true
      };
    case actionType.LOAD_CALENDAR_SUCCESS:
      return {
        ...state,
        loading: false,
        calendar: action.response.data
      }
    case actionType.LOAD_CALENDAR_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.response
      }
    case actionType.REQUEST_ADD_EVENT:
      return {
        ...state,
        loading: true
      }
    case actionType.ADD_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        calendar: action.response.data
      }
    case actionType.ADD_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: [...state.errors, action.response]
      }
    case actionType.REQUEST_DELETE_EVENT:
      return {
        ...state,
        loading: true
      }
    case actionType.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        calendar: action.response.data
      }
    case actionType.DELETE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: [...state.errors, action.response]
      }
    default:
      return {
        ...state,
        loading: false
      }
  }
}
