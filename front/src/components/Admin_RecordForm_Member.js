import React from 'react'
import { Icon } from 'semantic-ui-react'
import styles from '../css/admin_group.module.css'

const Admin_RecordForm_Member = ({ winner, loser, winners, setWinners, losers, setLosers, members, member }) => {

  const onClickCheck = (e) => {
    const uid = e.target.dataset.uid
    const member = members.find((member) => member.uid === uid)

    if(winners.length === 2 || losers.length === 2) {
      alert('더 이상 추가할 수 없습니다.')
    } else {
      if(winner) {setWinners([...winners, member])}
      else if(loser) {setLosers([...losers, member])}
    }
  }

  return (
    <div className={styles.member}>
      <img src={member.photoURL} alt="member profile" />
      <div className={styles.info}>
        <span>{member.displayName}</span>
        <span>{member.rating}</span>
      </div>
      <Icon name="check" data-uid={member.uid} onClick={onClickCheck} />
    </div>
  )
}

export default Admin_RecordForm_Member