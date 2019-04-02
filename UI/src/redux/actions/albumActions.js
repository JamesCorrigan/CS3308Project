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
