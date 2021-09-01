import React from 'react'
import styles from '../css/group.module.css'

const MemberCard = ({ member, index }) => {

  return (
    <div className={styles.member_card} key={index}>
      <div className={styles.top}>
        {
        member.photoURL ? 
        <img src={member.photoURL} alt="member profile" /> :
        <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="default profile img" />       
        }
      </div>
      <div className={styles.mid}>
        <span className={styles.name}>{member.displayName}</span>
        <span className={styles.status}>{member.status}</span>
      </div>
      <div className={styles.bot}>
        <div className="button__index" data-name={member.displayName}>Look Detail</div>
      </div>
    </div>
  )
}

export default MemberCard