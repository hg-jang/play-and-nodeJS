import React, { useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, TextArea, Button } from 'semantic-ui-react'
import useInput from '../../hooks/useInput'
import { UPLOAD_POST_IMAGE_REQUEST, REMOVE_IMAGE_REQUEST, ADD_POST, INIT_IMAGEPATHS } from '../../reducers/group';
import styles from '../css/group.module.css'
import { fbaseFirestore } from '../fbase';
import { v4 as uuidv4 } from 'uuid'

const PostForm = () => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const [post, onChangePost, setPost] = useInput('')
  
  const { currentUser } = useSelector((state) => state.auth)
  const { imagePaths } = useSelector((state) => state.group)

  const imageInputRef = useRef()
  const onChangeImageInput = useCallback((e) => {
    const file = e.target.files[0]
    const src = file.name

    return dispatch({
      type: UPLOAD_POST_IMAGE_REQUEST,
      data: {
        src: src,
        file: file,
      }
    })
  }, [])

  const onClickUploadImage = useCallback(() => {
    imageInputRef.current.click()
  }, [])

  const onClickAddPost = useCallback(() => {
    const id = uuidv4()

    fbaseFirestore.collection(group).doc('group data').collection('posts').doc(id).set({
      writerUID: currentUser.uid,
      writerPhotoURL: currentUser.photoURL,
      writerDisplayName: currentUser.displayName,
      content: post,
      imagePaths: imagePaths,
    })
    .then(() => {
      dispatch({
        type: ADD_POST,
        data: {
          writerUID: currentUser.uid,
          writerPhotoURL: currentUser.photoURL,
          writerDisplayName: currentUser.displayName,
          content: post,
          imagePaths: imagePaths,
        }
      })
    })
    .catch((error) => {
      alert(error)
    })
    .then(() => {
      setPost('')
      dispatch({
        type: INIT_IMAGEPATHS,
      })
    })
  }, [post, imagePaths])

  const onClickRemoveImage = useCallback((e) => {
    dispatch({
      type: REMOVE_IMAGE_REQUEST,
      data: e.target.dataset.ref,
    })
  }, [])


  return (
    <Form>
      <TextArea placeholder="내용을 적어주세요" value={post} onChange={onChangePost} />
      <div className={styles.post_buttons}>
        <input type="file" hidden ref={imageInputRef} onChange={onChangeImageInput} />
        <Button secondary onClick={onClickUploadImage}>사진 추가</Button>
        <Button primary onClick={onClickAddPost}>작성</Button>
      </div>
      {imagePaths.map((path, index) => (
        <div className={styles.img} key={index}>
          <img src={path.path} alt="image" />
          <Button color='red' data-ref={path.ref} onClick={onClickRemoveImage}>제거</Button>
        </div>
      ))}
    </Form>
  )
}

export default PostForm