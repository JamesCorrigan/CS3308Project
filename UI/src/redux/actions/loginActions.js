import * as actionType from './actionTypes';

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
  return fetch('/login', requestOptions)
    .then(responseHandler)
    .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });
}

/*Login wrapper function*/


export function login(email, password) {
  console.log(email, password);
  return dispatch => {
    dispatch({ type: actionType.LOGIN_REQUEST, email });
    loginHandler(email, password).then(user => {
      dispatch({ type: actionType.LOGIN_SUCCESS, user })
    }, error => {
      dispatch({ type: actionType.LOGIN_FAILED, error })
    });
  }

}

function registerHandler(obj) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  };
  return fetch('/register', requestOptions);
}

export function register(first_name, last_name, email, password) {
  console.log('registering:');

  return dispatch => {
    dispatch({type: actionType.REGISTER_REQUEST});
    registerHandler(first_name, last_name, email, password)
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
