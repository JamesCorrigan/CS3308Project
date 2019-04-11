import * as actionType from './actionTypes';

/*
FOR WEBSOCKET:
export const request = () => dispatch => {
  try {

    window.webSocket.sendCommand('action.call', {}, response => {
      //response
    });
  } catch (e) {
    console.error(e)
  }
}
*/

export function requestAllImages(obj) {
  return {
    type: actionType.REQUEST_GET_IMAGES,
    obj
  };
};

export function recieveImages(obj) {
  return {
    type: actionType.GET_IMAGES_SUCCESS,
    data: obj.data,
    time: Date.now()
  }
}
function uploadHandler(img) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: img
  };
  return fetch('/upload', requestOptions)
    .then(data => {
      //what to do with data?
      return data;
    })
}

export function uploadImage(img) {
  return dispatch => {
    dispatch({ type: actionType.REQUEST_UPLOAD_IMAGE });
    uploadHandler(img).then(response => {
      if (response.code == 200) {
        dispatch({ type: actionType.UPLOAD_IMAGE_SUCCESS, response })
      } else if (response.code == 204) {
        dispatch({ type: actionType.UPLOAD_IMAGE_FAILURE, response })
      }
    }, error => {
      dispatch({ type: actionType.UPLOAD_IMAGE_FAILURE, error })
    });
  }
}
