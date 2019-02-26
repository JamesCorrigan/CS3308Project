import * as actionType from '../actions/actionTypes';


const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

    case actionType.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }

    case actionType.DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case actionType.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }

    default:
      return state
  }
}

export const increment = () => {
  return dispatch => {
    dispatch({
      type: actionType.INCREMENT_REQUESTED
    })

    dispatch({
      type: actionType.INCREMENT
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: actionType.INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: actionType.INCREMENT
      })
    }, 3000)
  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: actionType.DECREMENT_REQUESTED
    })

    dispatch({
      type: actionType.DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: actionType.DECREMENT_REQUESTED
    })
    return setTimeout(() => {
      dispatch({
        type: actionType.DECREMENT
      })
    }, 3000)
  }
}
