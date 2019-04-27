import * as actionType from './actionTypes';
const API = 'http://localhost:4000';

function addImageHandler(url, family) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, family })
  };
  return fetch(API + '/addImageToDB', requestOptions)
    .then(responseHandler)
    .then(data => {
        console.log('add image data', data);
        return data;
    });
}



export function addImageToDB(url, family) {
  return dispatch => {
    dispatch({ type: actionType.REQUEST_ADD_URL });
    addImageHandler(url, family).then(response => {
      console.log('add response ', response);
      if (response.code === 200) {
        dispatch({ type: actionType.ADD_URL_SUCCESS, response })
      } else if (response.code === 204) {
        dispatch({ type: actionType.ADD_URL_FAILED, response })
      }
    }, error => {
      dispatch({ type: actionType.ADD_URL_FAILED, error })
    });
  }
}

function getImageHandler(family) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ family })
  };
  return fetch(API + '/getAllFamilyImages', requestOptions)
    .then(responseHandler)
    .then(data => {
        return data;
    });
}

export function getAllFamilyImages(familyID) {
  return dispatch => {
    dispatch({ type: actionType.REQUEST_GET_IMAGES });
    getImageHandler(familyID).then(response => {
      if (response.code === 200) {
        dispatch({ type: actionType.GET_IMAGES_SUCCESS, response })
      } else if (response.code === 204) {
        dispatch({ type: actionType.GET_IMAGES_FAILURE, response })
      }
    }, error => {
      dispatch({ type: actionType.GET_IMAGES_FAILURE, error })
    });
  }
}

export function recieveImages(obj) {
  return {
    type: actionType.GET_IMAGES_SUCCESS,
    data: obj.data,
    time: Date.now()
  }
}


function responseHandler(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
              //logout
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
