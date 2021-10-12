import React, { useCallback, useState, useRef, useEffect } from "react";
import { Button, Icon, TextArea } from "semantic-ui-react";
import { fbaseFirestore } from "../fbase";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { 
  INIT_EDITING_IMAGEPATHS, REMOVE_POST, EDIT_POST, 
  SET_EDITING_IMAGEPATHS, UPLOAD_EDITING_POST_IMAGE_REQUEST, REMOVE_EDITING_IMAGE_REQUEST,
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
  const { editingImagePaths } = useSelector((state) => state.group)
  // 여기서 imagePaths는 작업중인 post의 id와 그 속에 있는 사진들의 imagePaths로 이루어진 객체
  const [imagePaths, setImagePaths] = useState({})
  
  const imageInputRef = useRef()
  const onClickUploadImage = useCallback(() => {
    imageInputRef.current.click()
  }, [])
  const onChangeImageInput = useCallback((e) => {
    const file = e.target.files[0]
    const src = file.name

    return dispatch({
      type: UPLOAD_EDITING_POST_IMAGE_REQUEST,
      data: {
        src: src,
        file: file,
        id: post.id,
      }
    })
  }, [])
  const onClickRemoveImage = useCallback((e) => {
    dispatch({
      type: REMOVE_EDITING_IMAGE_REQUEST,
      data: {
        imageRef: e.target.dataset.ref,
        id: post.id,
      }
    })
  }, [])

  const onClickEditPost = useCallback(() => {
    setNewPost(post.content)
    setIsEditing(true)
    dispatch({
      type: SET_EDITING_IMAGEPATHS,
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
      type: INIT_EDITING_IMAGEPATHS,
    })
    setIsEditing(false)
  }, [])

  const onClickFinishEdit = useCallback(() => {
    fbaseFirestore.collection(group).doc('group data').collection('posts').doc(post.id).set({
      content: newPost,
      imagePaths: imagePaths,
    }, { merge: true })
    .then(() => {
      dispatch({
        type: EDIT_POST,
        data: {
          id: post.id,
          content: newPost,
          imagePaths: imagePaths,
        }
      })
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      dispatch({
        type: INIT_EDITING_IMAGEPATHS,
        data: post.id,
      })
      setIsEditing(false)
      setNewPost('')
    })
  }, [post, newPost, imagePaths])

  useEffect(() => {
    if(editingImagePaths) {
      setImagePaths(editingImagePaths.concat().find((path) => path.id === post.id))
    }
  }, [editingImagePaths])

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

  useEffect(() => {
    console.log(imagePaths);
  }, [imagePaths])

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
        {typeof imagePaths !== "undefined" && imagePaths.imagePaths.length !== 0 &&
        <div className={styles.images}>
          {imagePaths.imagePaths.map((path, index) => (
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