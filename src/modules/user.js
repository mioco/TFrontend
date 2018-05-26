import { push } from 'react-router-redux'
import * as API from '../utils/api';

export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log(action.payload)
      return {
        ...action.payload
      }
    case 'GET_RESET_URL':
      return {
        ...state,
        result: action.payload
      }
    case 'GET_CODE':
      return {
        ...state,
      }  
    case 'ADD_SUBSCRIPTION_URL':
      return {
        ...state,
        user: {
          ...state.user,
          urlList: [...state.user.urlList, action.payload]
        }
      }
    case 'REMOVE_SUBSCRIPTION_URL':
      return {
        ...state,
        result: action.payload
      } 
    default:
      return state
  }
}


export const login = (payload) => dispatch => {
  return API.login(payload)
    .then(res => dispatch({
      type: 'SET_USER',
      payload: res,
    }));
}
 
export const logout = dispatch => {
  return API.logout()
    .then(() => dispatch({
      type: 'SET_USER',
      payload: null
    }));
}

export const authority = dispatch => {
  return API.authority()
    .then((res) => {
      dispatch({ type: 'SET_USER', payload: res })
      dispatch(push('/home'));
    });
}
 
export const register = (payload) => dispatch => {
  return API.register(payload)
    .then(payload => dispatch({
      type: 'SET_USER',
      payload,
    }));
}

export const getCode = (email) => {
  return API.getCode(email);
}
 
export const addSubscriptionUrl = (payload) => dispatch => {
  return API.addSubscriptionUrl(payload)
    .then(payload => dispatch({
      type: 'ADD_SUBSCRIPTION_URL',
      payload,
    }));
}

export const removeSubscriptionUrl = (id) => dispatch => {
  return API.removeSubscriptionUrl(id)
    .then(() => dispatch({
      type: 'REMOVE_SUBSCRIPTION_URL',
    }));
}
 
export const getProfile = (dispatch, getState) => {
  const email = getState().user.email;
  console.log(getState())
  if (email) {
    return
  }
  return API.getProfile(email)
    .then(payload => dispatch({
      type: 'SET_USER',
      payload,
    }));
}

export const getResetUrl = (email) => dispatch => {
  return API.getResetUrl(email)
    .then(payload => dispatch({
      type: 'GET_RESET_URL',
      payload,
    }));
}
