import * as actionType from './actionTypes';


/*Login wrapper function*/

function getHandler(family) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(`/getCalendar/${family}`, requestOptions)
    .then(responseHandler)
    .then(data => {
        return data;
    });
}


export function getCalendar(family) {
  //fetch calendar from server, then store in reducer
  return dispatch => {
    dispatch({ type: actionType.REQUEST_LOAD_CALENDAR });
    getHandler(family).then(response => {
      if (response.code === 200) {
        dispatch({ type: actionType.LOAD_CALENDAR_SUCCESS, response})
      } else {
        dispatch({ type: actionType.LOAD_CALENDAR_FAILED, response})
      }
    })
  }
}



function addHandler(family, event) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ family, event })
  };
  return fetch('/addCalendar', requestOptions)
    .then(responseHandler)
    .then(data => {
        return data;
    });
}

export function addEvent(family, newEvent) {
  return dispatch => {
    dispatch({ type: actionType.REQUEST_ADD_EVENT })
    addHandler(family, newEvent).then(response => {
      if (response.code === 200) {
        dispatch({ type: actionType.ADD_EVENT_SUCCESS, response})
      } else {
        dispatch({ type: actionType.ADD_EVENT_FAILURE, response})
      }
    })
  }
}

function deleteHandler(family, event) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ family, event })
  };
  return fetch('/deleteCalendar', requestOptions)
    .then(responseHandler)
    .then(data => {
        return data;
    });
}

export function deleteEvent(family, dEvent) {
  return dispatch => {
    dispatch({ type: actionType.REQUEST_DELETE_EVENT });
    deleteHandler(family, dEvent).then(response => {
      if (response.code === 200) {
        //event deleted
        dispatch({ type: actionType.DELETE_EVENT_SUCCESS, response })
      } else {
        dispatch({ type: actionType.DELETE_EVENT_FAILURE, response })

      }
    })
  }
}

function calResponseHandler(res) {
  return res;
}

function responseHandler(res) {
    return res.text().then(text => {
        const data = JSON.parse(text);
        if (!res.ok) {
            const error = (data && data.message) || res.statusText;
            return Promise.reject(error);
        } else {
          return data;
        }
    });
}
