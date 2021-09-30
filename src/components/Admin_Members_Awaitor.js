import React, { useCallback } from 'react'
import { fbaseFirestore } from '../fbase'
import { useRouter } from 'next/router'
import { getDate } from '../../pages/create-group'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_MEMBER, EDIT_GROUP_INFO, REMOVE_AWAITOR } from '../../reducers/group'
import styles from '../css/../css/admin_group.module.css'

const Admin_Members_Awaitor = ({awaitor, index}) => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const createdDate = useSelector((state) => state.group.currentGroup?.createdDate)
  const groupIntroduce = useSelector((state) => state.group.currentGroup?.groupIntroduce)
  const numberOfMember = useSelector((state) => state.group.currentGroup?.numberOfMember)

  const onClickAdmit = useCallback(() => {
    fbaseFirestore.collection(group).doc('group data').collection('awaitors').doc(awaitor.uid)
    .delete()
    .then(() => {
      dispatch({
        type: REMOVE_AWAITOR,
        data: awaitor.uid,
      })
    })
    .catch((error) => {
      alert('대기자를 처리하는 과정에 오류가 발생하였습니다. :', error)
    })
    .then(() => {
      fbaseFirestore.collection(group).doc('group data').collection('members').doc(awaitor.uid).set({
        displayName:  awaitor.displayName,
        uid: awaitor.uid,
        photoURL: awaitor.photoURL,
        joinedDate: getDate(),
        status: '새로운 멤버',
        rating: 1500,
        allGames: 0,
        winnedGames: 0,
        losedGames: 0,
      })
    })
    .catch((error) => {
      alert('대기자를 멤버에 추가하는 과정에 오류가 발생하였습니다. :', error)
    })
    .then(() => {
      fbaseFirestore.collection(group).doc('group information')
      .set({
        numberOfMember: numberOfMember + 1,
      }, { merge: true })
      .then(() => {
        dispatch({
          type: EDIT_GROUP_INFO,
          data: numberOfMember + 1,
        })
      })
      .catch((error) => {
        console.log(error);
      })
    })
    .catch((error) => {
      alert('그룹 정보를 업데이트하는 과정에 오류가 발생하였습니다 :', error)
    })
    .then(() => {
      fbaseFirestore.collection('whole users').doc(awaitor.uid).collection('joining groups').doc(group)
      .set({
        createdDate: createdDate,
        groupIntroduce: groupIntroduce,
        groupName: group,
        isAdmin: false,
        joinedDate: getDate(),
        numberOfMember: numberOfMember,
      })
    })
    .catch((error) => {
      alert('유저의 가입 그룹 목록에 추가하는 과정에 오류가 발생하였습니다. :', error)
    })
    .then(() => {
      dispatch({
        type: ADD_MEMBER,
        data: {
          displayName:  awaitor.displayName,
          uid: awaitor.uid,
          photoURL: awaitor.photoURL,
          joinedDate: getDate(),
          status: '새로운 멤버',
          rating: 1500,
          allGames: 0,
          winnedGames: 0,
          losedGames: 0,
        }
      })
    })
    .then(() => {
      alert('가입을 승인하였습니다.')
    })
  }, [awaitor])

  const onClickDeny = useCallback(() => {
    fbaseFirestore.collection(group).doc('group data').collection('awaitors').doc(awaitor.uid)
    .delete()
    .then(() => {
      dispatch({
        type: REMOVE_AWAITOR,
        data: awaitor.uid,
      })
    })
    .catch((error) => {
      alert('대기자 처리하는 과정에 오류가 발생하였습니다. :', error)
    })
    .then(() => {
      alert('가입을 거부하였습니다.')
    })
  }, [awaitor])

  return (
    <div className={styles.awaitor} key={index}>
      <img src={awaitor.photoURL} alt="awaitor profile" />
      <div>
        <div>{awaitor.displayName}</div>
        <span data-uid={awaitor.uid} onClick={onClickAdmit}>승인</span>
        <span data-uid={awaitor.uid} onClick={onClickDeny}>거절</span>
      </div>
    </div>
  )
}

export default Admin_Members_Awaitor