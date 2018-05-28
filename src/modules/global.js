const initialState = {
  navActive: false,
  notification: {
    text: '',
    show: false
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV': 
      console.log(state.navActive)
      return {
        navActive: !state.navActive,
      }
    case 'SET_NOTIFICATION': 
      return {
        ...state,
        notification: action.payload,
      }  
    default:
      return state
  }
}
