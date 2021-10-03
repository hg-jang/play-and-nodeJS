import { React, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fbaseFirestore } from '../../src/fbase';
import { CHANGE_CONTENT, LOAD_GROUP_INFO, LOAD_MEMBERS, LOAD_AWAITORS, LOAD_GROUP_SUCCESS } from '../../reducers/group';
import { Loader } from 'semantic-ui-react';
import AdminDashboard from '../../src/components/Admin_Dashboard';
import AdminConfig from '../../src/components/Admin_Config'
import AdminRecording from '../../src/components/Admin_Recording'
import AdminMembers from '../../src/components/Admin_Members'
import styles from '../../src/css/admin_group.module.css'

const admin_main = () => {
  const router = useRouter()
  const { group } = router.query
  const dispatch = useDispatch()
  const { content, isGroupLoading, isGroupLoaded, isGroupInfoLoaded, isMemberLoaded, isAwaitorLoaded } = useSelector((state) => state.group)

  const loadGroupInfo = () => {
    fbaseFirestore.collection(group).doc('group information')
    .get()
    .then((doc) => {
      dispatch({
        type: LOAD_GROUP_INFO,
        data: {
          createdDate: doc.data().createdDate,
          groupIntroduce: doc.data().groupIntroduce,
          groupName: doc.data().groupName,
          numberOfMember: doc.data().numberOfMember,
        }
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const loadMembers = () => {
    let membersArr = []

    fbaseFirestore.collection(group).doc('group data').collection('members')
    .get()
    .then((members) => {
      members.forEach((member) => {
        const memberObj = {
          displayName: member.data().displayName,
          photoURL: member.data().photoURL,
          uid: member.data().uid,
          joinedDate: member.data().joinedDate,
          rating: member.data().rating,
          startRating: member.data().startRating,
          allGames: member.data().allGames,
          winnedGames: member.data().winnedGames,
          losedGames: member.data().losedGames,
          status: member.data().status,
        }
        membersArr = membersArr.concat(memberObj)
      })
    })
    .catch((error) => {
      console.log(error)
    })
    .then(() => {
      dispatch({
        type: LOAD_MEMBERS,
        data: membersArr,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const loadAwaitors = () => {
    let awaitorsArr = []

    fbaseFirestore.collection(group).doc('group data').collection('awaitors')
    .get()
    .then((awaitors) => {
      awaitors.forEach((awaitor) => {
        const awaitorObj = {
          displayName: awaitor.data().displayName,
          photoURL: awaitor.data().photoURL,
          uid: awaitor.data().uid,
        }
        awaitorsArr = awaitorsArr.concat(awaitorObj)
      })
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      dispatch({
        type: LOAD_AWAITORS,
        data: awaitorsArr,
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    if(router.query.group) {
      loadGroupInfo()
      loadMembers()
      loadAwaitors()
    }
  }, [router])

  useEffect(() => {
    dispatch({
      type: CHANGE_CONTENT,
      data: 'admin-dashboard',
    })
  }, [])

  useEffect(() => {
    if(isGroupInfoLoaded && isMemberLoaded && isAwaitorLoaded) {
      dispatch({
        type: LOAD_GROUP_SUCCESS,
      })
    }
  }, [isGroupInfoLoaded, isMemberLoaded, isAwaitorLoaded])

  return (
    <>
    {isGroupLoading && <Loader>Loading</Loader>}
    {isGroupLoaded &&
    <div className={styles.admin_container}>
      {content === 'admin-dashboard' && <AdminDashboard />}
      {content === 'admin-config' && <AdminConfig />}
      {content === 'admin-recording' && <AdminRecording />}
      {content === 'admin-members' && <AdminMembers />}
    </div>}
    </>
  )
};

export default admin_main