import React from 'react'
import styles from '../css/admin_group.module.css'

const AdminDashboard = () => {
  return (
    <div className={styles.admin_dashboard}>
      <div className={styles.members}>
        멤버 섹션
      </div>
      <div className={styles.posts}>
        포스트 섹션
      </div>
      <div className={styles.chats}>
        채팅 섹션
      </div>
      <div className={styles.chart}>
        차트 기능을 준비 중입니다.
      </div>
    </div>
  )
}

export default AdminDashboard