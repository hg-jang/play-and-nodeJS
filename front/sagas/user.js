import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import axios from 'axios'
import {
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
} from '../reducers/user'

function logInAPI(data) {
  return axios.post('/user/login', data)
}
function* logIn(action) {
  try{
    const result = yield call(logInAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    })
  } catch(err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    })
  }
}

function logOutAPI() {
  return axios.post('/user/logout')
}
function* logOut() {
  try{
    yield call(logOutAPI)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch(err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    })
  }
}

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
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

export default function* authSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchLogIn),
    fork(watchLogOut),
  ])
}