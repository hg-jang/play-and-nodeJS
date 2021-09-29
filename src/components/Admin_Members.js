import React from 'react'
import { useSelector } from 'react-redux';
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
              <div className={styles.member} key={index}>
                <img src={member.photoURL} alt="member profile" />
                <div>
                  <span>{member.displayName}</span>
                  <span>{member.status}</span>
                  <span>가입일 : {member.joinedDate}</span>
                </div>
                <ul>
                  <li>강퇴</li>
                  <li>권한 부여</li>
                  <li>뱃지 부여</li>
                </ul>
              </div>
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
              <div className={styles.awaitor} key={index}>
                <img src={awaitor.photoURL} alt="awaitor profile" />
                <div>
                  <div>{awaitor.displayName}</div>
                  <span>승인</span>
                  <span>거절</span>
                </div>
              </div>
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