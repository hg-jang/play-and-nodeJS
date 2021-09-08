import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import { fbaseStorage } from '../src/fbase'
import path from 'path'
import {
  UPLOAD_POST_IMAGE_REQUEST, UPLOAD_POST_IMAGE_SUCCESS, UPLOAD_POST_IMAGE_FAILURE,
  DOWNLOAD_POST_IMAGE_URL_REQUEST, DOWNLOAD_POST_IMAGE_URL_SUCCESS, DOWNLOAD_POST_IMAGE_URL_FAILURE,
  REMOVE_IMAGE_REQUEST, REMOVE_IMAGE_SUCCESS, REMOVE_IMAGE_FAILURE,
} from '../reducers/group'

function* uploadImage(action) {
  try {
    const storageRef = fbaseStorage.ref()
    
    const ext = path.extname(action.data.src)
    const basename = path.basename(action.data.src, ext)
    const imageRef = 'images/' + basename + '_' + new Date().getTime() + ext  // images/sample_1629970096998.png

    const childRef = yield call(
      [storageRef, storageRef.child],
      imageRef,
    )

    yield call(
      [childRef, childRef.put],
      action.data.file,
    )

    yield put({
      type: UPLOAD_POST_IMAGE_SUCCESS,
    })
    yield put({
      type: DOWNLOAD_POST_IMAGE_URL_REQUEST,
      data: imageRef,
    })
  } catch(error) {
    yield put({
      type: UPLOAD_POST_IMAGE_FAILURE,
      data: error.message,
    })
  }
}

function* downloadImageURL(action) {
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
      type: DOWNLOAD_POST_IMAGE_URL_SUCCESS,
      data: {
        path: result,
        ref: action.data,
      }
    })

  } catch(error) {
    yield put({
      type: DOWNLOAD_POST_IMAGE_URL_FAILURE,
      error: error.message,
    })
  }
}

function* removeImage(action) {
  try {
    const storageRef = fbaseStorage.ref()
  
    const childRef = yield call(
      [storageRef, storageRef.child],
      action.data,
    )

    yield call ([childRef, childRef.delete])

    yield put({
      type: REMOVE_IMAGE_SUCCESS,
      data: action.data,
    })
  } catch(error) {
    yield put({
      type: REMOVE_IMAGE_FAILURE,
      data: error.message,
    })
  }

}

function* watchUploadImage() {
  yield takeLatest(UPLOAD_POST_IMAGE_REQUEST, uploadImage)
}
function* watchDownloadImageURL() {
  yield takeLatest(DOWNLOAD_POST_IMAGE_URL_REQUEST, downloadImageURL)
}
function* watchRemoveImage() {
  yield takeLatest(REMOVE_IMAGE_REQUEST, removeImage)
}

export default function* groupSaga() {
  yield all([
    fork(watchUploadImage),
    fork(watchDownloadImageURL),
    fork(watchRemoveImage),
  ])
}