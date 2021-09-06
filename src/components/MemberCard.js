import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'
import styles from '../css/group.module.css'

const MemberCard = ({ member, index, setIsModalOpen, setDetailedMember }) => {
  const members = useSelector((state) => state.group.currentGroup?.members)
  const onClickOpenDetail = (e) => {
    setDetailedMember(members.find(member => member.uid === e.target.dataset.uid))
    setIsModalOpen(true)
  }

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
        <Button primary data-uid={member.uid} onClick={onClickOpenDetail}>Look Detail</Button>
      </div>
    </div>
  )
}

export default MemberCard