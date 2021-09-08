import React, { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, TextArea, Button } from 'semantic-ui-react'
import useInput from '../../hooks/useInput'
import { UPLOAD_POST_IMAGE_REQUEST, REMOVE_IMAGE_REQUEST } from '../../reducers/group';
import styles from '../css/group.module.css'

const PostForm = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const { imagePaths } = useSelector((state) => state.group)
  const [post, onChangePost] = useInput('')

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

  const onClickPost = useCallback(() => {
    // dispatch({
    //   type: POST,
    //   data: {

    //   }
    // })
  }, [])

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
        <Button primary onClick={onClickPost}>작성</Button>
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