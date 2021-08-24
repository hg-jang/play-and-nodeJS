import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import {
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
} from '../reducers/auth'
import { authService, dbService } from '../src/fbase'


function* logIn(action) {
  try {
    const auth = authService
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
    console.log('error', error);
    console.log('error.data', error.data);
    yield put({
      type: LOG_IN_FAILURE,
      error: error.data,
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
      error: err.data,
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
      error: error.data,
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

export default function* authSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ])
}