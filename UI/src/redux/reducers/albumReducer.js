import * as actionType from '../actions/actionTypes';
const initialState = {
  loading: false,
  success: false,
  errors: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.REQUEST_GET_IMAGES:
      return {
        ...state,
        loading: true
      };
    case actionType.GET_IMAGES_SUCCESS:
      return {
        ...state,
        data: action.response
      };
    case actionType.GET_IMAGES_FAILURE:
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
      case actionType.REQUEST_UPLOAD_IMAGE:
        return {
          ...state,
          loading: true
        };
      case actionType.UPLOAD_IMAGE_SUCCESS:
        return {
          ...state,
          data: action.response
        };
      case actionType.UPLOAD_IMAGE_FAILURE:
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
