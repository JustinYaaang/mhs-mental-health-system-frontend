import * as types from './ActionTypes';
import { getAuthenticationToken } from '../services/BackendService';

export function loginSuccess() {
  return {type: types.LOG_IN_SUCCESS}
}

export function logInUser(body) {
  return function(dispatch) {
    return getAuthenticationToken(body).then(response => {
        console.log(response);
        sessionStorage.setItem('jwt', response.jwt);
        dispatch(loginSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}