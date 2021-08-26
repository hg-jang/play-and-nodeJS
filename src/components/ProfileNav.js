import React from 'react'
import Link from 'next/link'
import styles from '../css/profile.module.css'

const ProfileNav = () => {
  return (
    <div className={styles.profile_nav}>
      <ul>
        <li><Link href="/profile/"><a>profile</a></Link></li>
        <li><Link href="/profile/redocrds"><a>기록</a></Link></li>
        <li>노력의 흔적...</li>
      </ul>
      <footer>
        {/* 미완 */}
      </footer>
    </div>
  )
}

export default ProfileNav