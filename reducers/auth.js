export const initialState = {
  isSigningUp: false,  // 회원가입
  isSignedUp: false,
  signUpError: null,
  isLoggingIn: false,   // 로그인
  isLoggedIn: false,
  logInError: null,
  isLoggingOut: false,  // 로그아웃
  isLoggedOut: false,
  logOutError: null,
  currentUser: null,     // 현재 사용자
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
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        currentUser: {
          ...state.currentUser,
          uid: action.user.uid,
          email: action.user.email,
          displayName: action.user.displayName,
          photoURL: action.user.photoURL,
        },
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpError: action.error,
      }
    // case LOG_IN_REQUEST:

    //   break;
    // case LOG_IN_SUCCESS:
  
    //   break;
    // case LOG_IN_FAILURE:
  
    //   break;
    // case LOG_OUT_REQUEST:

    //   break;
    // case LOG_OUT_SUCCESS:
  
    //   break;
    // case LOG_OUT_FAILURE:
  
    //   break;
    default:
      return state
  }
}

export default reducer