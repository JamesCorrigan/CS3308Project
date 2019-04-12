import * as actionType from './actionTypes';
import axios from 'axios';
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
function uploadHandler(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  };
  return fetch('/api/images', requestOptions)
    .then(data => {
      console.log(data);
      //what to do with data?
      return data;
    })
}

export function uploadImage(data) {
  axios.post('http://localhost:4000/upload', data)
  .then(response => {
    console.log(response);
    this.setState({ imageURL: `http://localhost:4000/${response.body.file}`, uploadStatus: true });
  }).catch(error => {
     console.log(error);
   });
  /*
  return dispatch => {
    dispatch({ type: actionType.REQUEST_UPLOAD_IMAGE });
    uploadHandler(data).then(response => {
      console.log(response);
      if (response.code == 200) {
        dispatch({ type: actionType.UPLOAD_IMAGE_SUCCESS, response })
      } else if (response.code == 204) {
        dispatch({ type: actionType.UPLOAD_IMAGE_FAILURE, response })
      }
    }, error => {
      dispatch({ type: actionType.UPLOAD_IMAGE_FAILURE, error })
    });
  }
  */
}
