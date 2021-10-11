import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import { fbaseAuth, fbaseStorage } from '../src/fbase'
import path from 'path'
import {
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  UPLOAD_PROFILE_IMAGE_REQUEST, UPLOAD_PROFILE_IMAGE_SUCCESS, UPLOAD_PROFILE_IMAGE_FAILURE,
  DOWNLOAD_PROFILE_IMAGE_URL_REQUEST, DOWNLOAD_PROFILE_IMAGE_URL_SUCCESS, DOWNLOAD_PROFILE_IMAGE_URL_FAILURE,
  EDIT_NAME_REQUEST, EDIT_NAME_SUCCESS, EDIT_NAME_FAILURE,
  EDIT_PROFILE_IMAGE_REQUEST, EDIT_PROFILE_IMAGE_SUCCESS, EDIT_PROFILE_IMAGE_FAILURE,
} from '../reducers/auth'

function* logIn(action) {
  try {
    const auth = fbaseAuth
    const result = yield call(
      [auth, auth.signInWithEmailAndPassword],
      action.data.email,
      action.data.password,
    )
    yield put({
      type: LOG_IN_SUCCESS,
      user: result.user
    })
  } catch(error) {
    yield put({
      type: LOG_IN_FAILURE,
      error: error.message,
    })
  }
}

function* logOut() {
  try {
    const auth = fbaseAuth
    yield call(
      [auth, auth.signOut],
    )
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch(error) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.message,
    })
  }
}

function* signUp(action) {
  try {
    const auth = fbaseAuth
    yield call(
      [auth, auth.createUserWithEmailAndPassword],
      action.data.email,
      action.data.password,
    )
    yield put({
      type: SIGN_UP_SUCCESS,
    })
  } catch(error) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.message,
    })
  }
}

function* uploadProfileImage(action) {
  try {
    const storageRef = fbaseStorage.ref()

    const ext = path.extname(action.data.src)              // 확장자 추출
    const basename = path.basename(action.data.src, ext)   // 확장자 뺀 이름 추출
    const imageRef = 'images/' + basename + '_' + new Date().getTime() + ext   // images/sample_1629970096998.png

    const childRef = yield call(
      [storageRef, storageRef.child],
      imageRef,
    )

    yield call(
      [childRef, childRef.put],
      action.data.file,
    )
    
    yield put({
      type: UPLOAD_PROFILE_IMAGE_SUCCESS,
    })
    yield put({
      type: DOWNLOAD_PROFILE_IMAGE_URL_REQUEST,
      data: imageRef,
    })
  } catch(error) {
    yield put({
      type: UPLOAD_PROFILE_IMAGE_FAILURE,
      error: error.message,
    })
  }
}

function* downloadProfileImageURL(action) {
  try {
    const storageRef = fbaseStorage.ref()
    const childRef = yield call(
      [storageRef, storageRef.child],
      action.data,
    )
    const result = yield call(
      [childRef, childRef.getDownloadURL],
    )
    yield put({
      type: DOWNLOAD_PROFILE_IMAGE_URL_SUCCESS,
      data: result,
    })
    yield put({
      type: EDIT_PROFILE_IMAGE_REQUEST,
      data: result,
    })
  } catch(error) {
    yield put({
      type: DOWNLOAD_PROFILE_IMAGE_URL_FAILURE,
      error: error.message,
    })
  }
}

function* editName(action) {
  try {
    const user = fbaseAuth.currentUser

    yield call(
      [user, user.updateProfile],
      {
        displayName: action.data,
      },
    )

    yield put({
      type: EDIT_NAME_SUCCESS,
      data: action.data,
    })
  } catch(error) {
    yield put({
      type: EDIT_NAME_FAILURE,
      error: error.message,
    })
  }
}

function* editProfileImage(action) {
  try {
    const user = fbaseAuth.currentUser
    
    yield call(
      [user, user.updateProfile],
      {
        photoURL: action.data !== '' ? action.data : user.photoURL,
      },
    )
    
    yield put({
      type: EDIT_PROFILE_IMAGE_SUCCESS,
      data: action.data !== '' ? action.data : user.photoURL,
    })
  } catch(error) {
    yield put({
      type: EDIT_PROFILE_IMAGE_FAILURE,
      error: error.message,
    })
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}
function* watchUploadProfileImage() {
  yield takeLatest(UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImage)
}
function* watchDownloadProfileImageURL() {
  yield takeLatest(DOWNLOAD_PROFILE_IMAGE_URL_REQUEST, downloadProfileImageURL)
}
function* watchEditName() {
  yield takeLatest(EDIT_NAME_REQUEST, editName)
}
function* watchEditProfileImage() {
  yield takeLatest(EDIT_PROFILE_IMAGE_REQUEST, editProfileImage)
}

export default function* authSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchUploadProfileImage),
    fork(watchDownloadProfileImageURL),
    fork(watchEditName),
    fork(watchEditProfileImage),
  ])
}