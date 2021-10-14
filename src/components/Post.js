import React, { useCallback, useState, useRef, useEffect } from "react";
import { Button, Icon, TextArea } from "semantic-ui-react";
import { fbaseFirestore } from "../fbase";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { 
  INIT_IMAGEPATHS, REMOVE_POST, EDIT_POST, EDIT_POST_REQUEST,
  UPLOAD_POST_IMAGE_REQUEST, REMOVE_IMAGE_REQUEST,
  LOAD_COMMENTS,
 } from "../../reducers/group";
 import CommentForm from "./CommentForm";
import Comment from './Comment'
import styles from '../css/group.module.css'
import useInput from "../../hooks/useInput";


const Post = ({ post }) => {
  const router = useRouter()
  const { group } = router.query

  const [newPost, onChangeNewPost, setNewPost] = useInput('')
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useDispatch()
  const uid = useSelector((state) => state.auth.currentUser?.uid)
  const { postImagePaths, isPostEdited } = useSelector((state) => state.group)
  
  const imageInputRef = useRef()
  const onClickUploadImage = useCallback(() => {
    imageInputRef.current.click()
  }, [])
  const onChangeImageInput = useCallback((e) => {
    const file = e.target.files[0]
    const src = file.name

    return dispatch({
      type: UPLOAD_POST_IMAGE_REQUEST,
      data: {
        src: src,
        file: file,
        id: post.id,
      }
    })
  }, [])
  const onClickRemoveImage = (e) => {
    dispatch({
      type: REMOVE_IMAGE_REQUEST,
      imageRef: e.target.dataset.ref,
      id: post.id,
    })
  }

  const onClickEditPost = useCallback(() => {
    setNewPost(post.content)
    setIsEditing(true)
    dispatch({
      type: EDIT_POST_REQUEST,
      data: post.id,
    })
  }, [post])

  const onClickRemovePost = useCallback(() => {
    fbaseFirestore.collection(group).doc('group data').collection('posts').doc(post.id).delete()
    .then(() => {
      dispatch({
        type: REMOVE_POST,
        data: post.id,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }, [post])

  const onClickCancle = useCallback(() => {
    setNewPost('')
    dispatch({
      type: INIT_IMAGEPATHS,
      data: post.id,
    })
    setIsEditing(false)
  }, [])

  const onClickFinishEdit = useCallback(() => {
    const imagePaths =
    postImagePaths.find((path) => path.id === post.id)
    ? postImagePaths.find((path) => path.id === post.id).imagePaths
    : []

    console.log(imagePaths);
    fbaseFirestore.collection(group).doc('group data').collection('posts').doc(post.id).set({
      content: newPost,
      imagePaths: imagePaths,
    }, { merge: true })
    .then(() => {
      // 포스트 내용 수정 dispatch
      dispatch({
        type: EDIT_POST,
        data: {
          id: post.id,
          content: newPost,
          imagePaths: imagePaths,
        }
      })
      // 해당 id의 iamgepaths 초기화
      dispatch({
        type: INIT_IMAGEPATHS,
        data: post.id,
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }, [post, newPost, postImagePaths])

  // useEffect(() => {
  //   if(editingImagePaths) {
  //     setImagePaths(editingImagePaths.concat().find((path) => path.id === post.id))
  //   }
  // }, [editingImagePaths])

  // post 편집 끝나면
  useEffect(() => {
    if(isPostEdited) {
      setIsEditing(false)
      setNewPost('')
    }
  }, [isPostEdited])

  const loadComments = () => {
    let commentsArr = []

    fbaseFirestore.collection(group).doc('group data').collection('posts').doc(post.id).collection('comments')
    .get()
    .then((comments) => {
      comments.forEach((comment) => {
        const commentObj = {
          commentWriterDisplayName: comment.data().commentWriterDisplayName,
          commentWriterPhotoURL: comment.data().commentWriterPhotoURL,
          commentWriterUID: comment.data().commentWriterUID,
          content: comment.data().content,
          date: comment.data().date,
          id: comment.data().id,
          like: comment.data().like,
        }
        commentsArr = commentsArr.concat(commentObj)
      })
    })
    .catch((error) => {
      console.log(error)
    })
    .then(() => {
      dispatch({
        type: LOAD_COMMENTS,
        data: {
          comments: commentsArr,
          postId: post.id,
        }
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    loadComments()
  }, [])

  return (
    <div className={styles.post}>
      <div className={styles.post_writer}>
        <img src={post.writerPhotoURL} alt="writer image" />
        <div>
          <span>{post.writerDisplayName}</span>
          <span>{post.date.substring(0, 4)}년 {post.date.substring(4, 6)}월 {post.date.substring(6, 8)}일 {post.date.substring(9, 11)}시 {post.date.substring(11, 13)}분</span>
        </div>
      </div>
      {!isEditing ?
      <> 
      <div className={styles.post_content}>
        {uid === post.writerUID &&
        <Button.Group>
          <Button icon>
            <Icon name='edit' onClick={onClickEditPost} />
          </Button>
          <Button icon>
            <Icon name="delete" onClick={onClickRemovePost} />
          </Button>
        </Button.Group>
        }
        <div className={styles.content}>
          {post.content}
        </div>
      </div>
      {post.imagePaths.length > 0 &&
      <div className={styles.post_images}>
        {post.imagePaths.map((imagePath) => (
          <img src={imagePath.path} alt="post image" />
        ))}
      </div>}
      </>
      :
      <>
        <TextArea placeholder={post.content} value={newPost} onChange={onChangeNewPost} />
        <div className={styles.post_buttons}>
          <input type="file" hidden ref={imageInputRef} onChange={onChangeImageInput} />
          <Button secondary size="tiny" onClick={onClickUploadImage}>사진 추가</Button>
          <Button.Group>
            <Button size="tiny" onClick={onClickCancle}>취소</Button>
            <Button primary size="tiny" onClick={onClickFinishEdit}>수정</Button>
          </Button.Group>
        </div>
        {typeof postImagePaths.length !== 0 && postImagePaths.find((path) => path.id === post.id) &&
        <div className={styles.images}>
          {postImagePaths.find((path) => path.id === post.id).imagePaths.map((path, index) => (
            <div className={styles.img} key={index}>
              <img src={path.path} alt="image" />
              <Button size="tiny" color='red' data-ref={path.ref} onClick={onClickRemoveImage}>제거</Button>
            </div>
          ))}
        </div>}
      </>
      }
      <div className={styles.post_comments}>
        <CommentForm post={post} />
        {post.comments
        ? post.comments.map((comment) => <Comment postId={post.id} comment={comment} />)
        : <div>코멘트 없다.</div>}
      </div>
    </div>
  )
}

export default Post