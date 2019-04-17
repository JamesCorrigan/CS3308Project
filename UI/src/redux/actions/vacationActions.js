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
        console.log('gethandler data ', data);
        return data;
    });
}


export function getCalendar(family) {
  //fetch calendar from server, then store in reducer
  return dispatch => {
    dispatch({ type: actionType.REQUEST_LOAD_CALENDAR });
    console.log(`/getCalendar/${family}`);
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
        console.log(data);
        return data;
    });
}

function addEvent(family, newEvent) {
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
