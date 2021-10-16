import React, { useCallback } from 'react'
import { LOAD_GROUP_REQUEST } from '../../reducers/group'
import { Icon } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import styles from '../css/my-groups.module.css'

const GroupCard = ({ group, index }) => {
  const dispatch = useDispatch()
  
  const defaultSrc = 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg'

  const onClickEnter = useCallback(() => {
    dispatch({
      type: LOAD_GROUP_REQUEST,
    })
  }, [group])

  return (
    <div className={styles.group_card} key={index}>
      <div className={styles.group_image}>
        <img src={defaultSrc} alt="team profile" />
        {group.isAdmin === true ? <div className={styles.admin_button} onClick={onClickEnter}><Link href={`/admin/${group.groupName}`}><a><Icon fitted name='setting' size='large' /></a></Link></div> : <></>}
      </div>
      <h1 className={styles.team_name} onClick={onClickEnter}><Link href={`/group/${group.groupName}`}><a>{group.groupName}</a></Link></h1>
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