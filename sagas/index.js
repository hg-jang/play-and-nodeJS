import { all, fork } from 'redux-saga/effects'
import authSaga from './auth'
import groupSaga from './group'

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(groupSaga),
  ])
}