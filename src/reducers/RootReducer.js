import { combineReducers } from 'redux';
import session from './SessionReducer';

const rootReducer = combineReducers({
  // short hand property names
  // user,
  session
})

export default rootReducer;