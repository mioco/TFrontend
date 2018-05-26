import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user';
import global from './global';

export default combineReducers({
  routing: routerReducer,
  user,
  global,
})