import * as actionType from './actionTypes';

export function request(obj) {
  return {
    type: actionType.ACTION_CALL,
    obj
  };
};

export function recieve(json) {
  return {
    type: actionType.CALL_RECIEVED,
    data: json.data,
    time: Date.now()
  }
}

export function fetchMembers() {
  fetch('/users').then(res => res.json()).then(members => {
    console.log(members);
    return {
      type: actionType.CALL_RECIEVED,
      data: members
    }
  })
}
