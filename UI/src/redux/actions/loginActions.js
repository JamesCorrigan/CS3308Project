import * as actionType from './actionTypes';
const API = 'http://localhost:4000';

export function fetchMembers() {
  fetch('/users').then(res => res.json()).then(members => {
    console.log(members);
  })
}

/*Login handler function*/
function loginHandler(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };
  return fetch(API + '/login', requestOptions)
    .then(responseHandler)
    .then(user => {
        return user;
    });
}

/*Login wrapper function*/


export function login(email, password) {
  return dispatch => {
    dispatch({ type: actionType.LOGIN_REQUEST });
    loginHandler(email, password).then(response => {
      console.log('login response ', response);
      if (response.code === 200) {
        dispatch({ type: actionType.LOGIN_SUCCESS, response })
      } else if (response.code === 204) {
        dispatch({ type: actionType.LOGIN_FAILED, response })
      }
    }, error => {
      dispatch({ type: actionType.LOGIN_FAILED, error })
    });
  }
}

export function logout() {
  return dispatch => {
    dispatch({ type: actionType.LOG_OUT })
  }
}

function familyHandler(obj) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  };
  return fetch(API + '/createFamily', requestOptions)
    .then(responseHandler)
    .then(data => {
      //what to do with data?
      return data;
    })
}

export function createFamily(obj) {
  console.log('Creating family:', obj.last_name);
  return dispatch => {
    dispatch({type: actionType.REQUEST_CREATE_FAMILY});
    familyHandler(obj)
    .then(response => {
      if (response.code === 200) {
        dispatch({ type: actionType.CREATE_FAMILY_SUCCESS, response })
      } else if (response.code === 204) {
        dispatch({ type: actionType.CREATE_FAMILY_FAILED, response })
      }
    }, error => {
      dispatch({ type: actionType.CREATE_FAMILY_FAILED, error })
    });
  }
}

function addHandler(obj) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  };
  return fetch(API + '/addMember', requestOptions)
  .then(responseHandler)
  .then(data => {
    return data;
  })
}

export function addMemberToFamily(obj) {
  console.log('adding user: ', obj);
  return dispatch => {
    dispatch({type: actionType.REQUEST_ADD_MEMBER});
    addHandler(obj)
    .then(response => {
      if (response.code === 200) {
        dispatch({ type: actionType.ADD_MEMBER_SUCCESS, response })
      } else if (response.code === 204) {
        dispatch({ type: actionType.ADD_MEMBER_FAILED, response })
      }
    }, error => {
      dispatch({ type: actionType.ADD_MEMBER_FAILED, error })
    });
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
