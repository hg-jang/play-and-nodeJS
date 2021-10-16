import { all, fork } from 'redux-saga/effects'
import userSaga from './user'
import authSaga from './auth'
import groupSaga from './group'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3070'
// axios.defaults.withCredentials = true

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    // fork(authSaga),
    // fork(groupSaga),
  ])
}