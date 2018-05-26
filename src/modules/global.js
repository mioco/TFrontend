const initialState = {
  navActive: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV': 
      return {
        navActive: !state.navActive,
      }

    default:
      return state
  }
}

export const toggleNav = () => dispatch => dispatch({
  type: 'TOGGLE_NAV',
});