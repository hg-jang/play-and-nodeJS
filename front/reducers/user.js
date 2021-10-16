export const initialState = {
  isSigningUp: false,  // 회원가입
  isSignedUp: false,
  signUpError: null,
  isLoggingIn: false,   // 로그인
  isLoggedIn: false,
  logInError: null,
  isLoggingOut: false,  // 로그아웃
  logOutError: null,
  currentUser: null,    // 현재 사용자
}

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false,
        signUpError: null,
      }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true,
      }
    }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        signUpError: action.error,
      }
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        isLoggedIn: false,
        logInError: null,
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        currentUser: action.data,
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        logInError: action.error
      }
    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logOutError: null,
      }
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        currentUser: null,
      }
    case LOG_OUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logOutError: action.error,
      }
    default:
      return state
  }
}

export default reducer