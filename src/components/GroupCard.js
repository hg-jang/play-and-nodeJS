import React from 'react'
import Link from 'next/link'
import { Icon } from 'semantic-ui-react'
import styles from '../css/myGroups.module.css'

const GroupCard = ({ group, index }) => {
  const defaultSrc = 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg'

  console.log('group card 호출 됨');
  return (
    <div className={styles.group_card} key={index}>
      <div className={styles.group_image}>
        <img src={defaultSrc} alt="team profile" />
        {group.isAdmin === true ? <Link href={`/admin/${group.groupName}`}><a><Icon fitted className={styles.setting} name='setting' size='large' /></a></Link> : <></>}
      </div>
      <Link href={`/group/${group.groupName}`}><a><h1 className={styles.team_name}>{group.groupName}</h1></a></Link>
      <h2 className={styles.group_introduce}>{group.groupIntroduce}</h2>
      <ul className={styles.group_info}>
        <li className={styles.created_date}>
          <span className={styles.info_name}>그룹 생성일</span>
          <span className={styles.info_content}>{group.createdDate}</span>
        </li>
        <li className={styles.joined_date}>
          <span className={styles.info_name}>그룹 가입일</span>
          <span className={styles.info_content}>{group.joinedDate}</span>
        </li>
        <li className={styles.member_number}>
          <span className={styles.info_name}>그룹 멤버 수</span>
          <span className={styles.info_content}>{group.numberOfMember}</span>
        </li>
      </ul>
    </div>
  )
}

export default GroupCard