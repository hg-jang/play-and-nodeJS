import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Icon, Button } from 'semantic-ui-react'
import { LOG_OUT_REQUEST } from '../../reducers/auth'
import styles from '../css/Top.module.css'
import classNames from 'classnames'

const Top = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth)

  const defaultPhotoURL = '/img/default_profile.jpg'
  
  const onClickLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    })
  }, [])

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
              <Icon name="edit" />
            </li>
            <li className={styles.name}>
              <span>{currentUser.displayName ? currentUser.displayName : '익명의 사용자'}님</span>
              <Icon name="edit" />
            </li>
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