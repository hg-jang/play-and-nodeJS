import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import {
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE,
} from '../reducers/auth'
import { authService, storageService } from '../src/fbase'
import path from 'path'


function* logIn(action) {
  try {
    const auth = authService
    const result = yield call(
      [auth, auth.signInWithEmailAndPassword],
      action.data.email,
      action.data.password,
    )
    console.log(result)
    yield put({
      type: LOG_IN_SUCCESS,
      user: result.user
    })
  } catch(error) {
    console.log('error', error);
    console.log('error.data', error.data);
    yield put({
      type: LOG_IN_FAILURE,
      error: error.message,
    })
  }
}

function* logOut() {
  try {
    const auth = authService
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
    const auth = authService
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

function* uploadImage(action) {
  try {
    const storageRef = storageService.ref()

    const ext = path.extname(action.data.src)              // 확장자 추출
    const basename = path.basename(action.data.src, ext)   // 확장자 뺀 이름 추출
    const imageRef = 'images/' + basename + '_' + new Date().getTime() + ext   // images/sample_1629970096998.png

    const childRef = yield call(
      [storageRef, storageRef.child],
      imageRef,
    )

    const result = yield call(
      [childRef, childRef.put],
      action.data.file,
    )
    
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
    })
    yield put({
      type: DOWNLOAD_IMAGE,
      // data: 이미지 다운로드
    })
  } catch(error) {
    yield put({
      type: UPLOAD_IMAGE_FAILURE,
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
function* watchUploadImage() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage)
}

export default function* authSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchUploadImage),
  ])
}