import React, { useCallback, useRef } from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, TextArea, Button } from 'semantic-ui-react'
import useInput from '../../hooks/useInput'
import { UPLOAD_POST_IMAGE_REQUEST, REMOVE_IMAGE_REQUEST, ADD_POST, INIT_IMAGEPATHS } from '../../reducers/group';
import styles from '../css/group.module.css'
import { fbaseFirestore } from '../fbase';
import { v4 as uuidv4 } from 'uuid'

export const getDateWithTime = () => {
  const today = new Date()

  const year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()

  let hour = today.getHours()
  let minute = today.getMinutes()
  let second = today.getSeconds()

  month = month < 10 ? `0${month}` : month
  date = date < 10 ? `0${date}` : date
  hour = hour < 10 ? `0${hour}` : hour
  minute = minute < 10 ? `0${minute}` : minute
  second = second < 10 ? `0${second}` : second

  return `${year}${month}${date}-${hour}${minute}${second}`
}

const PostForm = () => {
  const router = useRouter()
  const { group } = router.query
  
  const dispatch = useDispatch()
  const [post, onChangePost, setPost] = useInput('')
  
  const { currentUser } = useSelector((state) => state.auth)
  const { postImagePaths } = useSelector((state) => state.group)

  const imageInputRef = useRef()
  const onChangeImageInput = useCallback((e) => {
    const file = e.target.files[0]
    const src = file.name

    return dispatch({
      type: UPLOAD_POST_IMAGE_REQUEST,
      data: {
        src: src,
        file: file,
        id: "new",
      }
    })
  }, [])

  const onClickUploadImage = useCallback(() => {
    imageInputRef.current.click()
  }, [])

  const onClickRemoveImage = useCallback((e) => {
    dispatch({
      type: REMOVE_IMAGE_REQUEST,
      imageRef: e.target.dataset.ref,
      id: "new",
    })
  }, [])

  const onClickAddPost = useCallback(() => {
    const id = uuidv4()

    const postObj = {
      writerUID: currentUser.uid,
      writerPhotoURL: currentUser.photoURL,
      writerDisplayName: currentUser.displayName,
      content: post,
      imagePaths: postImagePaths.length !== 0 ? postImagePaths.find((path) => path.id === "new").imagePaths : [],
      date: getDateWithTime(),
      id: id,
    }

    fbaseFirestore.collection(group).doc('group data').collection('posts').doc(id).set(postObj)
    .then(() => {
      // posts 목록 업데이트
      dispatch({
        type: ADD_POST,
        data: postObj,
      })
      // input 초기화
      setPost('')
      // 이미지 경로 초기화
      dispatch({
        type: INIT_IMAGEPATHS,
        data: "new",
      })
    })
    .catch((error) => {
      alert(error)
    })
  }, [group, post, postImagePaths])

  return (
    <Form>
      <TextArea placeholder="오늘의 테니스 라이프를 적어주세요" value={post} onChange={onChangePost} />
      <div className={styles.post_buttons}>
        <input type="file" hidden ref={imageInputRef} onChange={onChangeImageInput} />
        <Button secondary onClick={onClickUploadImage}>사진 추가</Button>
        <Button primary onClick={onClickAddPost}>작성</Button>
      </div>
      {postImagePaths.length > 0 && postImagePaths.find((path) => path.id === "new") &&
      <div className={styles.images}>
        {postImagePaths.find((path) => path.id === "new").imagePaths.map((path, index) => (
          <div className={styles.img} key={index}>
            <img src={path.path} alt="image" />
            <Button size="tiny" color='red' data-ref={path.ref} onClick={onClickRemoveImage}>제거</Button>
          </div>
        ))}
      </div>}
    </Form>
  )
}

export default PostForm