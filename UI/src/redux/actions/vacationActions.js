import * as actionType from './actionTypes';


/*Login wrapper function*/

function getHandler(family) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ family })
  };
  return fetch('/getCalendar', requestOptions)
    .then(responseHandler)
    .then(data => {
        console.log(data);
        return data;
    });
}


export function getCalendar(family) {
  console.log('get calendar for ', family);
  //fetch calendar from server, then store in reducer
  return dispatch => {
    dispatch({ type: actionType.REQUEST_LOAD_CALENDAR });
    fetch(`/getCalendar/${family}`).then(response => {
      console.log(response);
      if (response.ok) {
        dispatch({ type: actionType.LOAD_CALENDAR_SUCCESS, response})
      } else {
        dispatch({ type: actionType.LOAD_CALENDAR_FAILED, response})
      }
    })
  }
}

/*
export function getCalendar(family) {
  console.log('get calendar for ', family);
  //fetch calendar from server, then store in reducer
  return dispatch => {
    dispatch({ type: actionType.REQUEST_LOAD_CALENDAR });
    getHandler(family).then(response => {
      console.log('get cal response:', response);
      if (response.code === 200) {
        dispatch({ type: actionType.LOAD_CALENDAR_SUCCESS, response });
      } else {
        dispatch({ type: actionType.LOAD_CALENDAR_FAILED, response });
      }
    }, error => {
      dispatch({ type: actionType.LOAD_CALENDAR_FAILED, error });
    })
  }
}
*/


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
