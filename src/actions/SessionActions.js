import * as types from './ActionTypes'
import { getAuthenticationToken } from '../services/BackendService'
import history from 'history.js'

export function loginSuccess () {
  return { type: types.LOG_IN_SUCCESS }
}

export function logoutSuccess () {
  return { type: types.LOG_OUT_SUCCESS }
}

export function logInUser (body) {
  return function (dispatch) {
    return getAuthenticationToken(body).then(response => {
      console.log(response)
      sessionStorage.setItem('jwt', response.data.token)
      sessionStorage.setItem('role', response.data.role)
      console.log(response.data.role)
      // sessionStorage.setItem('role', 'PATIENT');
      dispatch(loginSuccess())
      document.location.href = '/'
      // history.push('/')
    }).catch(error => {
      console.log('Session Actions error: ', error)
      throw (error)
    })
  }
}

export function logOutUser () {
  return function (dispatch) {
      sessionStorage.removeItem('jwt')
      sessionStorage.removeItem('role')
      dispatch(logoutSuccess())
      document.location.href = '/'
      // history.push('/')
  }
}
