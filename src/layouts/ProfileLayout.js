import React from 'react'
import ProfileNav from '../components/ProfileNav'
import styles from '../css/profile.module.css'

const ProfileLayout = ({ children }) => {
  return (
    <div className={styles.profile}>
      <ProfileNav />
      { children }
    </div>
  )
}

export default ProfileLayout