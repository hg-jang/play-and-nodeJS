import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import styles from '../css/Top.module.css'
import classNames from 'classnames'
import { Icon } from 'semantic-ui-react'
import { LOG_OUT_REQUEST } from '../../reducers/auth'
// import UserInfoModal from '../index/component/UserInfoModal'

const Top = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth)
  // const [isModalOpen, setIsModalOpen] = useState(false)

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
            <li><img src={currentUser.photoURL ? currentUser.photoURL : defaultPhotoURL} alt="user profile" /></li>
            <li className={styles.name}>{currentUser.displayName ? currentUser.displayName : '익명의 사용자'} 님,</li>
            <li><Icon name="setting" size="large" className={styles.icon__setting} /></li>
            <li className="button__index" onClick={onClickLogOut}>Log out</li>
          </ul>
          :
          <ul className={styles.header__loggedOut}>
            <li className="button__index"><Link href="/logIn"><a>Log In</a></Link></li>
            <li className="button__index"><Link href="/signUp"><a>Sign Up</a></Link></li>
          </ul>
          }
        </div>
      </div>
      {/* <UserInfoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
    </>
  )
}

export default memo(Top)