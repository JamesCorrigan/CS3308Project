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
  */
}

export const request(obj) {
  return {
    type: ACTION_CALL
    obj
  };
};

export const recieve(json) {
  return {
    type: CALL_RECIEVED,
    data: json.data,
    time: Date.now()
  }
}
