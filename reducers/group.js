export const initialState = {
  isImageUploading: false,      // 이미지 업로드
  isImageUploaded: false,
  imageUploadError: null,
  isImageURLDownloading: false, // 이미지 경로 다운로드
  isImageURLDownloaded: false,
  imageURLDownloadError: null,
  isImageRemoving: false,      // 이미지 제거
  isImageRemoved: false,
  imageRemoveError: null,
  imagePaths: [],
  content: 'community',
  currentGroup: {},
}

export const UPLOAD_POST_IMAGE_REQUEST = 'UPLOAD_POST_IMAGE_REQUEST'
export const UPLOAD_POST_IMAGE_SUCCESS = 'UPLOAD_POST_IMAGE_SUCCESS'
export const UPLOAD_POST_IMAGE_FAILURE = 'UPLOAD_POST_IMAGE_FAILURE'

export const DOWNLOAD_POST_IMAGE_URL_REQUEST = 'DOWNLOAD_POST_IMAGE_URL_REQUEST'
export const DOWNLOAD_POST_IMAGE_URL_SUCCESS = 'DOWNLOAD_POST_IMAGE_URL_SUCCESS'
export const DOWNLOAD_POST_IMAGE_URL_FAILURE = 'DOWNLOAD_POST_IMAGE_URL_FAILURE'

export const REMOVE_IMAGE_REQUEST = 'REMOVE_IMAGE_REQUEST'
export const REMOVE_IMAGE_SUCCESS = 'REMOVE_IMAGE_SUCCESS'
export const REMOVE_IMAGE_FAILURE = 'REMOVE_IMAGE_FAILURE'

export const SET_GAMES = 'SET_GAMES'
export const SET_MEMBERS = 'SET_MEMBERS'

export const ADD_POST = 'ADD_POST'
export const LOAD_POSTS = 'LOAD_POSTS'

export const CHANGE_CONTENT = 'CHANGE_CONTENT'
export const INIT_IMAGEPATHS = 'INIT_IMAGEPATHS'

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_GAMES:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          games: action.data,
        }
      }
    case SET_MEMBERS:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          members: action.data,
        }
      }
    case CHANGE_CONTENT:
      return {
        ...state,
        content: action.data,
      }
    case INIT_IMAGEPATHS:
      return {
        ...state,
        imagePaths: [],
      }
    case LOAD_POSTS:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          posts: action.data,
        }
      }
    case ADD_POST:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          posts: [{
            writerUID: action.data.writerUID,
            writerPhotoURL: action.data.writerPhotoURL,
            writerDisplayName: action.data.writerDisplayName,
            content: action.data.content,
            imagePaths: action.data.imagePaths,
          }, ...state.currentGroup.posts]
        }
      }
    case UPLOAD_POST_IMAGE_REQUEST:
      return {
        ...state,
        isImageUploading: true,
        isImageUploaded: false,
        imageUploadError: null,
      }
    case UPLOAD_POST_IMAGE_SUCCESS:
      return {
        ...state,
        isImageUploading: false,
        isImageUploaded: true,
      }
    case UPLOAD_POST_IMAGE_FAILURE:
      return {
        ...state,
        isImageUploading: false,
        imageUploadError: action.error,
      }
    case DOWNLOAD_POST_IMAGE_URL_REQUEST:
      return {
        ...state,
        isImageURLDownloading: true,
        isImageURLDownloaded: false,
        imageURLDownloadError: null,
      }
    case DOWNLOAD_POST_IMAGE_URL_SUCCESS:
      return {
        ...state,
        isImageURLDownloading: false,
        isImageURLDownloaded: true,
        imagePaths: [...state.imagePaths, { path: action.data.path, ref: action.data.ref, }],
      }
    case DOWNLOAD_POST_IMAGE_URL_FAILURE:
      return {
        ...state,
        isImageURLDownloading: false,
        imageURLDownloadError: action.error,
      }
    case REMOVE_IMAGE_REQUEST:
      return {
        ...state,
        isImageRemoving: true,
        isImageRemoved: false,
        imageRemoveError: null,
      }
    case REMOVE_IMAGE_SUCCESS:
      return {
        ...state,
        isImageRemoving: false,
        isImageRemoved: true,
        imagePaths: state.imagePaths.filter((path) => path.ref !== action.data)
      }
    case REMOVE_IMAGE_FAILURE:
      return {
        ...state,
        isImageRemoving: false,
        imageRemoveError: action.error,
      }
    
  
    default:
      return state
  }
}

export default reducer