import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_CONTENT } from '../../reducers/group';
import AdminDashboard from '../../src/components/Admin_Dashboard';
import AdminConfig from '../../src/components/Admin_Config'
import AdminRecording from '../../src/components/Admin_Recording'
import AdminMembers from '../../src/components/Admin_Members'
import styles from '../../src/css/admin_group.module.css'

const admin_main = () => {
  const { content } = useSelector((state) => state.group)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: CHANGE_CONTENT,
      data: 'admin-dashboard',
    })
  }, [])
  return (
    // <div className={styles.AdminMain}>
    //   <Header group={groupName}/>
    //   <div className={styles.Content}>
    //     <CreateUser allUsers={allUsers} group={groupName}/>
    //     <RegiMatch allUsers={allUsers} group={groupName}/>
    //     <UserList allUsers={allUsers} group={groupName}/>
    //     <MatchList allGame={allGame} group={groupName}/>
    //     <GroupJoinWant group={groupName}/>
    //   </div>
    // </div>
    <div className={styles.admin_container}>
      {content === 'admin-dashboard' && <AdminDashboard />}
      {content === 'admin-config' && <AdminConfig />}
      {content === 'admin-recording' && <AdminRecording />}
      {content === 'admin-members' && <AdminMembers />}
    </div>
  )
};

export default admin_main