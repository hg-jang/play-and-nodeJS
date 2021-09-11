import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import { fbaseStorage } from '../src/fbase'
import path from 'path'
import {
  UPLOAD_POST_IMAGE_REQUEST, UPLOAD_POST_IMAGE_SUCCESS, UPLOAD_POST_IMAGE_FAILURE,
  DOWNLOAD_POST_IMAGE_URL_REQUEST, DOWNLOAD_POST_IMAGE_URL_SUCCESS, DOWNLOAD_POST_IMAGE_URL_FAILURE,
  UPLOAD_EDITING_POST_IMAGE_REQUEST, UPLOAD_EDITING_POST_IMAGE_SUCCESS, UPLOAD_EDITING_POST_IMAGE_FAILURE,
  DOWNLOAD_EDITING_POST_IMAGE_URL_REQUEST, DOWNLOAD_EDITING_POST_IMAGE_URL_SUCCESS, DOWNLOAD_EDITING_POST_IMAGE_URL_FAILURE,
  REMOVE_IMAGE_REQUEST, REMOVE_IMAGE_SUCCESS, REMOVE_IMAGE_FAILURE,
  REMOVE_EDITING_IMAGE_REQUEST, REMOVE_EDITING_IMAGE_SUCCESS, REMOVE_EDITING_IMAGE_FAILURE,
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

function* uploadEditingImage(action) {
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
      type: UPLOAD_EDITING_POST_IMAGE_SUCCESS,
    })
    yield put({
      type: DOWNLOAD_EDITING_POST_IMAGE_URL_REQUEST,
      data: {
        imageRef: imageRef,
        id: action.data.id,
      }
    })
  } catch(error) {
    yield put({
      type: UPLOAD_EDITING_POST_IMAGE_FAILURE,
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

function* downloadEditingImageURL(action) {
  try {
    const storageRef = fbaseStorage.ref()

    const childRef = yield call(
      [storageRef, storageRef.child],
      action.data.imageRef,
    )

    const result = yield call(
      [childRef, childRef.getDownloadURL],
    )

    yield put({
      type: DOWNLOAD_EDITING_POST_IMAGE_URL_SUCCESS,
      data: {
        path: result,
        ref: action.data.imageRef,
        id: action.data.id,
      }
    })

  } catch(error) {
    yield put({
      type: DOWNLOAD_EDITING_POST_IMAGE_URL_FAILURE,
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

function* removeEditingImage(action) {
  try {
    const storageRef = fbaseStorage.ref()
  
    const childRef = yield call(
      [storageRef, storageRef.child],
      action.data.imageRef,
    )

    yield call ([childRef, childRef.delete])

    yield put({
      type: REMOVE_EDITING_IMAGE_SUCCESS,
      data: {
        ref: action.data.imageRef,
        id: action.data.id,
      }
    })
  } catch(error) {
    yield put({
      type: REMOVE_EDITING_IMAGE_FAILURE,
      data: error.message,
    })
  }
}

function* watchUploadImage() {
  yield takeLatest(UPLOAD_POST_IMAGE_REQUEST, uploadImage)
}
function* watchUploadEditingImage() {
  yield takeLatest(UPLOAD_EDITING_POST_IMAGE_REQUEST, uploadEditingImage)
}
function* watchDownloadImageURL() {
  yield takeLatest(DOWNLOAD_POST_IMAGE_URL_REQUEST, downloadImageURL)
}
function* watchDownloadEditingImageURL() {
  yield takeLatest(DOWNLOAD_EDITING_POST_IMAGE_URL_REQUEST, downloadEditingImageURL)
}
function* watchRemoveImage() {
  yield takeLatest(REMOVE_IMAGE_REQUEST, removeImage)
}
function* watchRemoveEditingImage() {
  yield takeLatest(REMOVE_EDITING_IMAGE_REQUEST, removeEditingImage)
}

export default function* groupSaga() {
  yield all([
    fork(watchUploadEditingImage),
    fork(watchUploadImage),
    fork(watchDownloadImageURL),
    fork(watchDownloadEditingImageURL),
    fork(watchRemoveImage),
    fork(watchRemoveEditingImage),
  ])
}