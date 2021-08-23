import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import {
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
} from '../reducers/auth'
import { fbase, authService, dbService } from '../src/fbase'



function* signUp(action) {
  try{
    const auth = fbase.auth()
    const result = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      action.data.email,
      action.data.password,
    )
    yield put({
      type: SIGN_UP_SUCCESS,
      user: result.user
    })
  } catch(err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

export default function* authSaga() {
  yield all([
    fork(watchSignUp),
  ])
}