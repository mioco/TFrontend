import * as API from '../utils/api';

const initialState = {
  tagList: [],
  pageList: [],
  page: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TAG_LIST':
      console.log(action.payload)  
      return {
        ...state,
        tagList: action.payload
      }
    case 'SET_PAGE_LIST':
      return {
        ...state,
        pageList: action.payload
      }
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload
      }
    default:
      return state
  }
}


export const getTags = (dispatch, getState) => {
  const email = getState().user.email;
  return API.getTags(email)
    .then(tagList => dispatch({
      type: 'SET_TAG_LIST',
      payload: tagList,
    }))
    .catch(e => console.log(e))
}

export const getPages = (dispatch, getState) => {
  // const email = getState().user.email;
  const email = 'zhuyichen1017@gmail.com'
  return API.getPages(email)
    .then(list => dispatch({
      type: 'SET_PAGE_LIST',
      payload: list,
    }))
    .catch(e => console.log(e))
}

export const getPage = id => (dispatch) => {
  return API.getPage(id)
    .then(p => dispatch({
      type: 'SET_PAGE',
      payload: p,
    }))
    .catch(e => console.log(e))
}