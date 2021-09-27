import React from 'react'
import styles from '../css/admin_group.module.css'

const AdminMembers = () => {

  return (
    <div className={styles.admin_members}>
      <div>
        <div className={styles.whole_users}>
          <h1>전체 멤버 목록</h1>
        </div>
      </div>
      <div>
        <div className={styles.awaitors}>
          <h1>가입 대기자 목록</h1>
        </div>
      </div>
    </div>
  )
}

export default AdminMembers