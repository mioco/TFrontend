const initialState = {
  navActive: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV': 
      console.log(state.navActive)
      return {
        navActive: !state.navActive,
      }

    default:
      return state
  }
}
