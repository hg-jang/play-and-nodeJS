import Router from "next/router"
import { fbaseFirestore } from "../src/fbase"

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
  isImageURLDownloading: false,    // 이미지 경로 다운로드
  isImageURLDownloaded: false,
  imageURLDownloadError: null,
  isProfileSaving: false,         // 프로필 저장
  isProfileSaved: false,
  profileSaveError: null,
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

export const DOWNLOAD_IMAGE_URL_REQUEST = 'DOWNLOAD_IMAGE_URL_REQUEST'
export const DOWNLOAD_IMAGE_URL_SUCCESS = 'DOWNLOAD_IMAGE_URL_SUCCESS'
export const DOWNLOAD_IMAGE_URL_FAILURE = 'DOWNLOAD_IMAGE_URL_FAILURE'

export const PROFILE_SAVE_REQUEST = 'PROFILE_SAVE_REQUEST'
export const PROFILE_SAVE_SUCCESS = 'PROFILE_SAVE_SUCCESS'
export const PROFILE_SAVE_FAILURE = 'PROFILE_SAVE_FAILURE'

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
      Router.replace('/')
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
      return {
        ...state,
        isImageUploading: false,
        isImageUploaded: true,
      }
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        isImageUploading: false,
        imageUploadError: action.error,
      }
    case DOWNLOAD_IMAGE_URL_REQUEST:
      return {
        ...state,
        isImageURLDownloading: true,
        isImageURLDownloaded: false,
        imageURLDownloadError: null,
      }
    case DOWNLOAD_IMAGE_URL_SUCCESS:
      return {
        ...state,
        isImageURLDownloading: false,
        isImageURLDownloaded: true,
        imageSrc: action.data,
      }
    case DOWNLOAD_IMAGE_URL_FAILURE:
      return {
        ...state,
        isImageURLDownloading: false,
        imageURLDownloadError: action.error,
      }
    case PROFILE_SAVE_REQUEST:
      return {
        ...state,
        isProfileSaving: true,
        isProfileSaved: false,
        profileSaveError: null,
      }
    case PROFILE_SAVE_SUCCESS: {
      // for Firestore Database
      fbaseFirestore.collection('whole users').doc(state.currentUser.uid).set({
        displayName: action.data.displayName,
        photoURL: action.data.photoURL,
      }, { merge: true })

      fbaseFirestore.collection('whole users').doc(state.currentUser.uid).collection('joining groups').get().then((groups) => {
        groups.forEach((group) => {
          // update in admins
          fbaseFirestore.collection(group.data().groupName).doc('group data').collection('admins').doc(state.currentUser.uid).set({
            displayName: action.data.displayName,
          }, { merge: true })
        
          // update in members
          fbaseFirestore.collection(group.data().groupName).doc('group data').collection('members').doc(state.currentUser.uid).set({
            displayName: action.data.displayName,
            photoURL: action.data.photoURL,
          }, { merge: true })
        })
      })
      Router.replace('/')
      return {
        ...state,
        isProfileSaving: false,
        isProfileSaved: true,
        currentUser: {
          ...state.currentUser,
          displayName: action.data.displayName,
          photoURL: action.data.photoURL,
        }
      }
    }
    case PROFILE_SAVE_FAILURE:
      return {
        ...state,
        isProfileSaving: false,
        profileSaveError: action.error,
      }
    default:
      return state
  }
}

export default reducer