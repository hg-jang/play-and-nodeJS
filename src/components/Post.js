import React, { useCallback, useState, useRef, useEffect } from "react";
import { Button, Icon, TextArea } from "semantic-ui-react";
import { fbaseFirestore } from "../fbase";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { 
  INIT_EDITING_IMAGEPATHS, REMOVE_POST, EDIT_POST, 
  SET_EDITING_IMAGEPATHS, UPLOAD_EDITING_POST_IMAGE_REQUEST, REMOVE_EDITING_IMAGE_REQUEST,
 } from "../../reducers/group";
// import Comment from './Comment'
// import CommentForm from "./CommentForm";
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
        type: INIT_EDITING_IMAEPATHS,
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

  return (
    <div className={styles.post}>
      <div className={styles.post_writer}>
        <img src={post.writerPhotoURL} alt="writer image" />
        <div>{post.writerDisplayName}</div>
      </div>
      {!isEditing ?
      <> 
      <div className={styles.post_content}>
        {uid === post.writerUID &&
        <Button.Group>
          <Button onClick={onClickEditPost}>수정</Button>
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
          <Button secondary onClick={onClickUploadImage}>사진 추가</Button>
          <Button.Group>
            <Button onClick={onClickCancle}>취소</Button>
            <Button primary onClick={onClickFinishEdit}>수정</Button>
          </Button.Group>
        </div>
        {imagePaths &&
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
      {/* <div className={styles.post_comments}> */}
        {/* <CommentForm /> */}
        {/* {post.comments.map((comment) => { <Comment comment={comment} /> })} */}
      {/* </div> */}
    </div>
  )
}

export default Post