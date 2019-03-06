import * as actionType from './actionTypes';

export function fetchMembers() {
  fetch('/users').then(res => res.json()).then(members => {
    console.log(members);
  })
}

/*Login handler function*/
function loginHandler(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };
  return fetch('/users/authenticate', requestOptions)
    .then(responseHandler)
    .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });
}

/*Login wrapper function*/
function request(user) { return { type: actionType.LOGIN_REQUEST, user } }
function success(user) { return { type: actionType.LOGIN_SUCCESS, user } }
function failure(error) { return { type: actionType.LOGIN_FAILED, error } }

export function login(username, password) {
  console.log(username, password);
  return dispatch => {
    dispatch(request({ username }))
    loginHandler(username, password).then(user => {
      dispatch(success(user))
    }, error => {
      dispatch(failure(error))
    });
  }

}


/*logout wrapper function*/

function responseHandler(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export function createUser(username, password) {
  return dispatch => {
    dispatch(request({ username }))
    loginHandler(username, password).then(user => {
      dispatch(success(user))
    }, error => {
      dispatch(failure(error))
    });
  }
}
