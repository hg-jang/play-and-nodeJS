export const initialState = {
  isGroupLoading: false,
  isGroupLoaded: false,
  isMemberLoaded: false,
  isGameLoaded: false,
  isPostLoaded: false,
  isGroupInfoLoaded: false,
  isAwaitorLoaded: false,
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
  editingImagePaths: [],
  content: 'community',
  currentGroup: {
    chats: [],
  },
}

export const LOAD_GROUP_INIT = 'LOAD_GROUP_INIT'
export const LOAD_GROUP_REQUEST = 'LOAD_GROUP_REQUEST'
export const LOAD_GROUP_SUCCESS = 'LOAD_GROUP_SUCCESS'

export const UPLOAD_POST_IMAGE_REQUEST = 'UPLOAD_POST_IMAGE_REQUEST'
export const UPLOAD_POST_IMAGE_SUCCESS = 'UPLOAD_POST_IMAGE_SUCCESS'
export const UPLOAD_POST_IMAGE_FAILURE = 'UPLOAD_POST_IMAGE_FAILURE'

export const UPLOAD_EDITING_POST_IMAGE_REQUEST = 'UPLOAD_EDITING_POST_IMAGE_REQUEST'
export const UPLOAD_EDITING_POST_IMAGE_SUCCESS = 'UPLOAD_EDITING_POST_IMAGE_SUCCESS'
export const UPLOAD_EDITING_POST_IMAGE_FAILURE = 'UPLOAD_EDITING_POST_IMAGE_FAILURE'

export const DOWNLOAD_POST_IMAGE_URL_REQUEST = 'DOWNLOAD_POST_IMAGE_URL_REQUEST'
export const DOWNLOAD_POST_IMAGE_URL_SUCCESS = 'DOWNLOAD_POST_IMAGE_URL_SUCCESS'
export const DOWNLOAD_POST_IMAGE_URL_FAILURE = 'DOWNLOAD_POST_IMAGE_URL_FAILURE'

export const DOWNLOAD_EDITING_POST_IMAGE_URL_REQUEST = 'DOWNLOAD_EDITING_POST_IMAGE_URL_REQUEST'
export const DOWNLOAD_EDITING_POST_IMAGE_URL_SUCCESS = 'DOWNLOAD_EDITING_POST_IMAGE_URL_SUCCESS'
export const DOWNLOAD_EDITING_POST_IMAGE_URL_FAILURE = 'DOWNLOAD_EDITING_POST_IMAGE_URL_FAILURE'

export const REMOVE_IMAGE_REQUEST = 'REMOVE_IMAGE_REQUEST'
export const REMOVE_IMAGE_SUCCESS = 'REMOVE_IMAGE_SUCCESS'
export const REMOVE_IMAGE_FAILURE = 'REMOVE_IMAGE_FAILURE'

export const REMOVE_EDITING_IMAGE_REQUEST = 'REMOVE_EDITING_IMAGE_REQUEST'
export const REMOVE_EDITING_IMAGE_SUCCESS = 'REMOVE_EDITING_IMAGE_SUCCESS'
export const REMOVE_EDITING_IMAGE_FAILURE = 'REMOVE_EDITING_IMAGE_FAILURE'

export const REMOVE_AWAITOR = 'REMOVE_AWAITOR'

export const ADD_MEMBER = 'ADD_MEMBER'
export const EDIT_MEMBER = 'EDIT_MEMBER'
export const REMOVE_MEMBER = 'REMOVE_MEMBER'

export const LOAD_GROUP_INFO = 'LOAD_GROUP_INFO'
export const LOAD_GAMES = 'LOAD_GAMES'
export const LOAD_MEMBERS = 'LOAD_MEMBERS'
export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const LOAD_AWAITORS = 'LOAD_AWAITORS'

export const EDIT_GROUP_INFO = 'EDIT_GROUP_INFO'

export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const EDIT_POST = 'EDIT_POST'
export const SET_EDITING_IMAGEPATHS = 'SET_EDITING_IMAGEPATHS'

export const LIKE_POST = 'LIKE_POST'
export const DISLIKE_POST = 'DISLIKE_POST'

export const INIT_IMAGEPATHS = 'INIT_IMAGEPATHS'
export const INIT_EDITING_IMAGEPATHS = 'INIT_EDITING_IMAGEPATHS'

export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export const LIKE_COMMENT = 'LIKE_COMMENT'
export const DISLIKE_COMMENT = 'DISLIKE_COMMENT'

export const ADD_CHAT = 'ADD_CHAT'

export const CHANGE_CONTENT = 'CHANGE_CONTENT'

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_GROUP_INIT:
      return {
        ...state,
        isGroupLoading: false,
        isGroupLoaded: false,
        isMemberLoaded: false,
        isGameLoaded: false,
        isPostLoaded: false,
        isGroupInfoLoaded: false,
        isAwaitorLoaded: false,
      }
    case LOAD_GROUP_REQUEST:
      return {
        ...state,
        isGroupLoading: true,
        isGroupLoaded: false,
      }
    case LOAD_GROUP_SUCCESS:
      return {
        ...state,
        isGroupLoading: false,
        isGroupLoaded: true,
      }
    case LOAD_GROUP_INFO:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          createdDate: action.data.createdDate,
          groupIntroduce: action.data.groupIntroduce,
          groupName: action.data.groupName,
          numberOfMember: action.data.numberOfMember,
        },
        isGroupInfoLoaded: true,
      }
    case LOAD_GAMES:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          games: action.data,
        },
        isGameLoaded: true,
      }
    case LOAD_MEMBERS:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          members: action.data,
        },
        isMemberLoaded: true,
      }
    case LOAD_POSTS:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          posts: action.data,
        },
        isPostLoaded: true,
      }
    case LOAD_COMMENTS:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.map((post) => {
            if(post.id !== action.data.postId) {
              return post
            }
            return {
              ...post,
              comments: action.data.comments,
            }
          })
        }
      }
    case LOAD_AWAITORS:
      console.log(action.data);
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          awaitors: action.data,
        },
        isAwaitorLoaded: true,
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
    case INIT_EDITING_IMAGEPATHS:
      return {
        ...state,
        editingImagePaths: state.imagePaths.map((path) => {
          if(action.data !== path.id) {
            return path
          }
          return null
        })
      }
    case EDIT_GROUP_INFO:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          createdDate: action.data.createdDate ? action.data.createdDate : state.currentGroup.createdDate, 
          groupIntroduce: action.data.groupIntroduce ? action.data.groupIntroduce : state.currentGroup.groupIntroduce,
          groupName:  action.data.groupName ? action.data.groupName : state.currentGroup.groupName,
          numberOfMember: action.data.numberOfMember ? action.data.numberOfMember : state.currentGroup.numberOfMember,
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
            date: action.data.date,
            id: action.data.id,
          }, ...state.currentGroup.posts]
        }
      }
    case REMOVE_POST:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.filter((post) => post.id !== action.data)
        }
      }
    case SET_EDITING_IMAGEPATHS:
      return {
        ...state,
        editingImagePaths: [...state.editingImagePaths, {
          id: action.data,
          imagePaths: [],
        }]
      }
    case EDIT_POST:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.map((post) => {
            if(post.id !== action.data.id) {
              return post
            }
            return {
              ...post,
              content: action.data.content,
              imagePaths: action.data.imagePaths,
            }
          })
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
    case UPLOAD_EDITING_POST_IMAGE_REQUEST:
      return {
        ...state,
        isImageUploading: true,
        isImageUploaded: false,
        imageUploadError: null,
      }
    case UPLOAD_EDITING_POST_IMAGE_SUCCESS:
      return {
        ...state,
        isImageUploading: false,
        isImageUploaded: true,
      }
    case UPLOAD_EDITING_POST_IMAGE_FAILURE:
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
    case DOWNLOAD_EDITING_POST_IMAGE_URL_REQUEST:
      return {
        ...state,
        isImageURLDownloading: true,
        isImageURLDownloaded: false,
        imageURLDownloadError: null,
      }
    case DOWNLOAD_EDITING_POST_IMAGE_URL_SUCCESS:
      return {
        ...state,
        isImageURLDownloading: false,
        isImageURLDownloaded: true,
        editingImagePaths: state.editingImagePaths.map((path) => {
          if(path.id !== action.data.id) {
            return path
          }
          return {
            ...path,
            imagePaths: [...path.imagePaths, { path: action.data.path, ref: action.data.ref }]
          }
        })
      }
    case DOWNLOAD_EDITING_POST_IMAGE_URL_FAILURE:
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
    case REMOVE_EDITING_IMAGE_REQUEST:
      return {
        ...state,
        isImageRemoving: true,
        isImageRemoved: false,
        imageRemoveError: null,
      }
    case REMOVE_EDITING_IMAGE_SUCCESS:
      return {
        ...state,
        isImageRemoving: false,
        isImageRemoved: true,
        editingImagePaths: state.editingImagePaths.map((path) => {
          if(path.id === action.data.id) {
            return {
              ...path,
              imagePaths: path.imagePaths.filter((path) => path.ref !== action.data.ref)
            }
          }
          return path
        })
      }
    case REMOVE_EDITING_IMAGE_FAILURE:
      return {
        ...state,
        isImageRemoving: false,
        imageRemoveError: action.error,
      }
    case ADD_COMMENT:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.map((post) => {
            if(post.id !== action.data.postId) {
              return post
            }
            return {
              ...post,
              comments: [action.data.comment, ...post.comments]
            }
          })
        }
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.map((post) => {
            if(post.id !== action.data.postId) {
              return post
            }
            return {
              ...post,
              comments: post.comments.filter((comment) => comment.id !== action.data.commentId)
            }
          })
        }
      }
    case LIKE_COMMENT:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.map((post) => {
            if(post.id !== action.data.postId) {
              return post
            }
            return {
              ...post,
              comments: post.comments.map((comment) => {
                if(comment.id !== action.data.commentId) {
                  return comment
                }
                return {
                  ...comment,
                  like: [...comment.like, action.data.who]
                }
              })
            }
          })
        }
      }
    case DISLIKE_COMMENT:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.map((post) => {
            if(post.id !== action.data.postId) {
              return post
            }
            return {
              ...post,
              comments: post.comments.map((comment) => {
                if(comment.id !== action.data.commentId) {
                  return comment
                }
                return {
                  ...comment,
                  like: comment.like.filter((like) => like !== action.data.who)
                }
              })
            }
          })
        }
      }
    case ADD_CHAT:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          chats: [...state.currentGroup.chats, action.data],
        }
      }
    case REMOVE_AWAITOR:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          awaitors: state.currentGroup.awaitors.filter((awaitor) => awaitor.uid !== action.data)
        }
      }
    case ADD_MEMBER:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          members: [...state.currentGroup.members, action.data],
        }
      }
    case EDIT_MEMBER:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          members: state.currentGroup.members.map((member) => {
            if(member.uid !== action.data.uid) {
              return member
            } else {
              if(action.data.game === 1) {
                return {
                  ...member,
                  rating: action.data.rating,
                  allGames: member.allGames + 1,
                  winnedGames: member.winnedGames + 1,
                }
              } else {
                return {
                  ...member,
                  rating: action.data.rating,
                  allGames: member.allGames + 1,
                  losedGames: member.losedGames + 1,
                }
              }
              
            }
          })
        }
      }
    case REMOVE_MEMBER:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          members: state.currentGroup.members.filter((member) => member.uid !== action.data)
        }
      }
    default:
      return state
  }
}

export default reducer