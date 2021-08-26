import Router from "next/router"

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

  isImageUploading: false,    // 이미지 업로드
  isImageUploaded: false,
  imageUploadError: null,
  imageSrc: '',
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

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST'
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE'

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
      Router.push('/')
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
        currentUser: {
          ...state.currentUser,
          uid: action.user.uid,
          email: action.user.email,
          displayName: action.user.displayName,
          photoURL: action.user.photoURL,
        },
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        logInError: action.error,
      }
      case LOG_OUT_REQUEST: {
      Router.push('/')
      return {
        ...state,
        isLoggingOut: true,
        isLoggedIn: true,
        logOutError: null,
      }
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
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        isImageUploading: true,
        isImageUploaded: false,
        imageUploadError: null,
      }
    case UPLOAD_IMAGE_SUCCESS:
      console.log(action.data)
      // return {
      //   ...state,
      //   isImageUploading: false,
      //   isImageUploaded: true,
      //   imageSrc: action.src,
      // }
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        isImageUploading: false,
        imageUploadError: action.error,
      }
    default:
      return state
  }
}

export default reducer