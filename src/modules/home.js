import * as API from '../utils/api';

const initialState = {
  tagList: [],
  postList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TAG_LIST':
      return {
        ...state,
        tagList: action.payload
      }
    case 'SET_POST_LIST':
      return {
        ...state,
        postList: action.payload
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
    }));
}