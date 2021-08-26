import React, { useRef, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../src/css/profile.module.css'
import { UPLOAD_IMAGE_REQUEST } from '../../reducers/auth'
import UserProfileCard from '../../src/components/UserProfileCard'

const profile = () => {
  const imageInputRef = useRef()

  const dispatch = useDispatch()
  const { currentUser, imageSrc, imageUploadError } = useSelector((state) => state.auth)

  const onClickImageInput = useCallback(() => {
    imageInputRef.current.click()
  }, [])

  const onChangeImageInput = useCallback((e) => {
    const file = e.target.files[0]
    const src = file.name

    return dispatch({
      type: UPLOAD_IMAGE_REQUEST,
      data: {
        src: src,
        file: file,
      },
    })
  }, [])

  useEffect(() => {
    console.log(imageSrc)
  }, [imageSrc])

  useEffect(() => {
    if(alert) {
      alert(imageUploadError)
    }
  }, [imageUploadError])

  return (
    <div className={styles.profile__edit}>
      <h1>프로필</h1>
      <h2>안녕하세요, {currentUser.displayName ? currentUser.displayName : '익명의 사용자'}님?</h2>
      <UserProfileCard currentUser={currentUser} />
      <div className={styles.edit_form}>
        <div className={styles.edit_name}>
          <span>이름 변경 :</span>
          <input className="input__underline" placeholder="익명의 사용자" />
        </div>
        <div className={styles.edit_img}>
          {imageSrc && <img src={imageSrc} />}
          <input type="file" hidden ref={imageInputRef} onChange={onChangeImageInput} />
          <span className={styles.edit_img_button} onClick={onClickImageInput}>프로필 사진 변경</span>
        </div>
        <span className={styles.edit_save}>변경 내용 저장</span>
      </div>
    </div>
  )
}

export default profile