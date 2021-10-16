import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import axios from 'axios'
import {
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
} from '../reducers/user'

function signUpAPI(data) {
  return axios.post('/user', data)
}
function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data)
    yield put({
      type: SIGN_UP_SUCCESS,
    })
  } catch(err) {
    if(err.response) {
      yield put({
        type: SIGN_UP_FAILURE,
        error: err.response.data,
      })
    } else if(error.request) {
      console.log(error.request)
    } else {
      console.log('Error :', error.message);
    }
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