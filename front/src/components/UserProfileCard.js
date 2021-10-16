import React from 'react'
import styles from '../css/profile.module.css'

const UserProfileCard = ({ currentUser }) => {
  const defaultPhotoURL = '/img/default_profile.jpg'

  return (
    <div className={styles.user_profile_card}>
      <img src={currentUser.photoURL ? currentUser.photoURL : defaultPhotoURL} />
      <span>{currentUser.displayName ? currentUser.displayName : '익명의 사용자'}</span>
    </div>
  )
}

export default UserProfileCard