export const initialState = {
  content: 'community',
  currentGroup: {},
}

export const SET_GAMES = 'SET_GAMES'
export const SET_MEMBERS = 'SET_MEMBERS'
export const CHANGE_CONTENT = 'CHANGE_CONTENT'

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
    case SET_MEMBERS:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          members: action.data,
        }
      }
    case CHANGE_CONTENT:
      return {
        ...state,
        content: action.data,
      }
    default:
      return state
  }
}

export default reducer