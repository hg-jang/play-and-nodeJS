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

  isProfileImageUploading: false,    // 프로필 이미지 업로드
  isProfileImageUploaded: false,
  profileImageUploadError: null,
  isProfileImageURLDownloading: false,    // 프로필 이미지 경로 다운로드
  isProfileImageURLDownloaded: false,
  profileImageURLDownloadError: null,
  isNameEditing: false,             // 프로필 이름 변경
  isNameEdited: false,
  nameEditError: null,
  isProfileImageEditing: false,     // 프로필 이미지 변경
  isProfileImageEdited: false,
  profileImageEditError: null,
  profileImageURL: '',
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

export const UPLOAD_PROFILE_IMAGE_REQUEST = 'UPLOAD_PROFILE_IMAGE_REQUEST'
export const UPLOAD_PROFILE_IMAGE_SUCCESS = 'UPLOAD_PROFILE_IMAGE_SUCCESS'
export const UPLOAD_PROFILE_IMAGE_FAILURE = 'UPLOAD_PROFILE_IMAGE_FAILURE'

export const DOWNLOAD_PROFILE_IMAGE_URL_REQUEST = 'DOWNLOAD_PROFILE_IMAGE_URL_REQUEST'
export const DOWNLOAD_PROFILE_IMAGE_URL_SUCCESS = 'DOWNLOAD_PROFILE_IMAGE_URL_SUCCESS'
export const DOWNLOAD_PROFILE_IMAGE_URL_FAILURE = 'DOWNLOAD_PROFILE_IMAGE_URL_FAILURE'

export const EDIT_NAME_REQUEST = 'EDIT_NAME_REQUEST'
export const EDIT_NAME_SUCCESS = 'EDIT_NAME_SUCCESS'
export const EDIT_NAME_FAILURE = 'EDIT_NAME_FAILURE'

export const EDIT_PROFILE_IMAGE_REQUEST = 'EDIT_PROFILE_IMAGE_REQUEST'
export const EDIT_PROFILE_IMAGE_SUCCESS = 'EDIT_PROFILE_IMAGE_SUCCESS'
export const EDIT_PROFILE_IMAGE_FAILURE = 'EDIT_PROFILE_IMAGE_FAILURE'

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
    case UPLOAD_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        isProfileImageUploading: true,
        isProfileImageUploaded: false,
        profileImageUploadError: null,
      }
    case UPLOAD_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        isProfileImageUploading: false,
        isProfileImageUploaded: true,
      }
    case UPLOAD_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        isProfileImageUploading: false,
        profileImageUploadError: action.error,
      }
    case DOWNLOAD_PROFILE_IMAGE_URL_REQUEST:
      return {
        ...state,
        isProfileImageURLDownloading: true,
        isProfileImageURLDownloaded: false,
        profileImageURLDownloadError: null,
      }
    case DOWNLOAD_PROFILE_IMAGE_URL_SUCCESS:
      return {
        ...state,
        isProfileImageURLDownloading: false,
        isProfileImageURLDownloaded: true,
      }
    case DOWNLOAD_PROFILE_IMAGE_URL_FAILURE:
      return {
        ...state,
        isProfileImageURLDownloading: false,
        profileImageURLDownloadError: action.error,
      }
    case EDIT_NAME_REQUEST:
      return {
        ...state,
        isNameEditing: true,
        isNameEdited: false,
        nameEditError: null,
      }
    case EDIT_NAME_SUCCESS: {
      // for Firestore Database
      fbaseFirestore.collection('whole users').doc(state.currentUser.uid).set({
        displayName: action.data,
      }, { merge: true })

      fbaseFirestore.collection('whole users').doc(state.currentUser.uid).collection('joining groups').get().then((groups) => {
        groups.forEach((group) => {

          // update in admins
          fbaseFirestore.collection(group.data().groupName).doc('group data').collection('admins').doc(state.currentUser.uid)
          .get()
          .then((doc) => {
            if(doc.exists) {
              fbaseFirestore.collection(group.data().groupName).doc('group data').collection('admins').doc(state.currentUser.uid).set({
                displayName: action.data,
              }, { merge: true })
            }
          })
        
          // update in members
          fbaseFirestore.collection(group.data().groupName).doc('group data').collection('members').doc(state.currentUser.uid).set({
            displayName: action.data,
          }, { merge: true })
        })
      })
      
      return {
        ...state,
        isNameEditing: false,
        isNameEdited: true,
        currentUser: {
          ...state.currentUser,
          displayName: action.data,
        }
      }
    }
    case EDIT_NAME_FAILURE:
      return {
        ...state,
        isNameEditing: false,
        nameEditError: action.error,
      }
    case EDIT_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        isProfileImageEditing: true,
        isProfileImageEdited: false,
        profileImageEditError: null,
      }
    case EDIT_PROFILE_IMAGE_SUCCESS: {
      // for Firestore Database
      fbaseFirestore.collection('whole users').doc(state.currentUser.uid).set({
        photoURL: action.data,
      }, { merge: true })

      fbaseFirestore.collection('whole users').doc(state.currentUser.uid).collection('joining groups').get().then((groups) => {
        groups.forEach((group) => {
        
          // update in members
          fbaseFirestore.collection(group.data().groupName).doc('group data').collection('members').doc(state.currentUser.uid).set({
            photoURL: action.data,
          }, { merge: true })
        })
      })

      return {
        ...state,
        isProfielImageEditing: false,
        isProfileImageEdited: true,
        currentUser: {
          ...state.currentUser,
          photoURL: action.data,
        }
      }
    }
    case EDIT_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        isProfileImageEditing: false,
        profileImageEditError: action.error,
      }
    default:
      return state
  }
}

export default reducer