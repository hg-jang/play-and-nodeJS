import React, { useRef, memo, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Icon, Button } from 'semantic-ui-react'
import classNames from 'classnames'
import useInput from '../../hooks/useInput'
import styles from '../css/Top.module.css'
import { 
  LOG_OUT_REQUEST, EDIT_NAME_REQUEST, UPLOAD_PROFILE_IMAGE_REQUEST,
} from '../../reducers/auth'
import Router from 'next/router'

const Top = () => {
  const imageInputRef = useRef()
  const [isNameEditing, setIsNameEditing] = useState(false)
  const [text, onChangeText, setText] = useInput('')

  const dispatch = useDispatch()
  const { isLoggedIn, currentUser, isNameEdited } = useSelector((state) => state.user)

  const defaultPhotoURL = '/img/default_profile.jpg'

  const onClickEditName = useCallback(() => {
    setIsNameEditing(true)
  }, [])

  const onClickCompleteEdit = useCallback(() => {
    if(text) {
      dispatch({
        type: EDIT_NAME_REQUEST,
        data: text,
      })
    }
  }, [text])
  // 사진 변경 이벤트랑 리덕스 / 사가 수정 필요
  
  const onClickImageInput = useCallback(() => {
    imageInputRef.current.click()
  }, [])

  const onClickLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    })
  }, [])

  const onChangeImageInput = (e) => {
    const file = e.target.files[0]
    const src = file.name

    return dispatch({
      type: UPLOAD_PROFILE_IMAGE_REQUEST,
      data: {
        src: src,
        file: file,
      },
    })
  }

  useEffect(() => {
    if(isLoggedIn) {
      Router.replace('/')
    }
  }, [isLoggedIn])
  useEffect(() => {
    if(isNameEdited) {
      setText('')
      setIsNameEditing(false)
    }
  })

  return (
    <>
      <div className={styles.header}>
        <div className={classNames({["container"]: true, [styles.container__index__header]: true})}>
          <h1 className={styles.logo}><Link href="/"><a>Play &</a></Link></h1>
          {
          isLoggedIn ?
          <ul className={styles.header__loggedIn}>
            <li>
              <img src={currentUser.photoURL ? currentUser.photoURL : defaultPhotoURL} alt="user profile" />
              <Icon name="edit" onClick={onClickImageInput} />
              <input type="file" hidden ref={imageInputRef} onChange={onChangeImageInput} />
            </li>
            {isNameEditing ?
            <li className={styles.name_editing}>
              <input className="input__text__underline" type="text" value={text} onChange={onChangeText} />
              <Icon name="check" onClick={onClickCompleteEdit} />
            </li>
            :
            <li className={styles.name}>
              <span>{currentUser.nickname}님</span>
              <Icon name="edit" onClick={onClickEditName} />
            </li>
            }
            <li><Button primary onClick={onClickLogOut}>Log Out</Button></li>
          </ul>
          :
          <ul className={styles.header__loggedOut}>
            <Button primary><Link href="/logIn"><a>Log In</a></Link></Button>
            <Button primary><Link href="/signUp"><a>Sign Up</a></Link></Button>
          </ul>
          }
        </div>
      </div>
    </>
  )
}

export default memo(Top)