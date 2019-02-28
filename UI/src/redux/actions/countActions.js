import * as actionType from './actionTypes';

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
