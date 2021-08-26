import React from 'react'
import ProfileNav from '../components/ProfileNav'
import styles from '../css/profile.module.css'

const ProfileLayout = ({ children }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile_container}>
        <ProfileNav />
        { children }
      </div>
    </div>
  )
}

export default ProfileLayout