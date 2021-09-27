import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import { CHANGE_CONTENT } from "../../reducers/group";
import styles from '../css/admin_group.module.css'

const Admin_Nav = () => {
  const dispatch = useDispatch()
  const { currentGroup } = useSelector((state) => state.group)

  const defaultURL = 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'

  const onClickList = useCallback((e) => {
    const content = e.target.dataset.content

    dispatch({
      type: CHANGE_CONTENT,
      data: content,
    })
  }, [])

  return (
    <div className={styles.nav}>
      <div>
        <h1>{currentGroup.groupName}</h1>
        <img src={currentGroup.groupPhotoURL ? currentGroup.groupPhotoURL : defaultURL} />
      </div>
      <ul>
        <li data-content="admin-dashboard" onClick={onClickList}><Icon name="computer" />대쉬보드</li>
        <li data-content="admin-config" onClick={onClickList}><Icon name="configure" />설정</li>
        <li data-content="admin-recording" onClick={onClickList}><Icon name="clipboard outline" />경기 기록</li>
        <li data-content="admin-members" onClick={onClickList}><Icon name="users" />멤버 관리</li>
      </ul>
    </div>
  )
}

export default Admin_Nav