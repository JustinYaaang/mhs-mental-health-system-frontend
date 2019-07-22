import * as types from '../actions/ActionTypes';
import initialState from './InitialState';
// import {browserHistory} from 'react-router';
import { createBrowserHistory } from "history";
const browserHistory = createBrowserHistory();

export default function sessionReducer(state = initialState.session, action) {
  switch(action.type) {
    case types.LOG_IN_SUCCESS:
      browserHistory.push('/')
      return !!sessionStorage.jwt
    default: 
      return state;
  }
}