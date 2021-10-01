import React from 'react'
import { Icon } from 'semantic-ui-react'
import styles from '../css/admin_group.module.css'

const Admin_RecordForm_Selected = ({ winners, setWinners, losers, setLosers, members, member }) => {

  const onClickCancel = (e) => {
    const uid = e.target.dataset.uid
    const member = members.find((member) => member.uid === uid)

    const isWinner = winners.includes(member)
    const isLoser = losers.includes(member)

    if(isWinner) {
      if(winners.length === 1) {
        setWinners([])
      } else {
        setWinners(winners.concat().filter(winner => winner.uid !== uid))
      }
    }
    else if(isLoser) {
      if(losers.length === 1) {
        setLosers([])
      } else {
        setLosers(losers.concat().filter(loser => loser.uid !== uid))
      }
    }
  }

  return (
    <div className={styles.member}>
      <img src={member.photoURL} alt="member profile" />
      <div className={styles.info}>
        <span>{member.displayName}</span>
        <span>{member.rating}</span>
      </div>
      <Icon name="cancel" data-uid={member.uid} onClick={onClickCancel} />
    </div>
  )
}

export default Admin_RecordForm_Selected