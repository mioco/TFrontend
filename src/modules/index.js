import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user';
import global from './global';
import home from './home';

export default combineReducers({
  routing: routerReducer,
  user,
  global,
  home,
})