import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import styles from '../css/Top.module.css'
import classNames from 'classnames'
import { Icon } from 'semantic-ui-react'
// import UserInfoModal from '../index/component/UserInfoModal'

const Top = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth)
  // const [isModalOpen, setIsModalOpen] = useState(false)

  const onClickLogIn = useCallback(() => {
    console.log('log in');
  }, [])

  const onClickLogOut = useCallback(() => {
    console.log('log out');
  }, [])

  return (
    <>
      <div className={styles.header}>
        <div className={classNames({["container"]: true, [styles.container__index__header]: true})}>
          <h1 className={styles.logo}><Link href="/"><a>Play &</a></Link></h1>
          {
          isLoggedIn ?
          <ul className={styles.header__loggedIn}>
            <li><img src={currentUser.photoURL} alt="user profile" /></li>
            <li className={styles.name}>{currentUser.displayName} 님,</li>
            <li><Icon name="setting" size="large" className={styles.icon__setting} /></li>
            <li className="button__index" onClick={onClickLogOut}>Log out</li>
          </ul>
          :
          <ul className={styles.header__loggedOut}>
            <li className="button__index" onClick={onClickLogIn}>Log In</li>
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