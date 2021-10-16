import React from 'react'
import { useSelector } from 'react-redux';
import Admin_Members_Member from './Admin_Members_Member'
import Admin_Members_Awaitor from './Admin_Members_Awaitor'
import styles from '../css/admin_group.module.css'

const AdminMembers = () => {
  const members = useSelector((state) => state.group.currentGroup?.members).concat().sort((a, b) => a.displayName = b.displayName)
  const awaitors = useSelector((state) => state.group.currentGroup?.awaitors).concat().sort((a, b) => a.displayName = b.displayName)

  return (
    <div className={styles.admin_members}>
      <div>
        <div className={styles.members_box}>
          <h1>전체 멤버 목록</h1>
          <div>
            {members.map((member, index) => (
              <Admin_Members_Member member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className={styles.awaitors_box}>
          <h1>가입 대기자 목록</h1>
          {awaitors ?
          <div className={styles.awaitors}>
            {awaitors.map((awaitor, index) => (
              <Admin_Members_Awaitor awaitor={awaitor} index={index} />
            ))}
          </div>
          :
          <div className={styles.no_awaitors}>가입 대기자 없습니다.</div>
          }
        </div>
      </div>
    </div>
  )
}

export default AdminMembers