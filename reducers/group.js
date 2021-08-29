export const initialState = {
  isGamesLoading: false,
  isGamesLoaded: false,
  loadGamesError: null,
  currentGroup: {},
}

export const SET_GAMES = 'SET_GAMES'
export const SET_MEMBERS = 'SET_MEMBERS'


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_GAMES:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          games: action.data,
        } 
      }
    default:
      return state
  }
}

export default reducer