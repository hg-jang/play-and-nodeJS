import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { fbaseFirestore } from '../fbase'
import { REMOVE_MEMBER } from '../../reducers/group'
import { Modal, Button } from 'semantic-ui-react'
import styles from '../css/../css/admin_group.module.css'

const Admin_Members_Member = ({ member, index }) => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)

  const onClickRemove = useCallback(() => {
    fbaseFirestore.collection(group).doc('group data').collection('members').doc(member.uid)
    .delete()
    .then(() => {
      dispatch({
        type: REMOVE_MEMBER,
        data: member.uid,
      })
    })
    .catch((error) => {
      alert('멤버를 제거하는 중에 오류가 발생하였습니다. :', error)
    })
    .then(() => {
      fbaseFirestore.collection('whole users').doc(member.uid).collection('joining groups').doc(group)
      .delete()
      .catch((error) => {
        alert('유저의 그룹 목록에서 해당 그룹을 제거하는 중에 오류가 발생하였습니다. :', error)
      })
    })
  }, [member])

  const onClickEntrust = useCallback(() => {
    setModalOpen(true)
  }, [member])
  const giveAdmin = useCallback(() => {
    fbaseFirestore.collection('whole users').doc(member.uid).collection('joining groups').doc(group)
    .set({
      isAdmin: true,
    }, { merge: true })
    .then(() => {
      fbaseFirestore.collection(group).doc('group data').collection('admins').doc(member.uid)
      .set({
        displayName: member.displayName,
        uid: member.uid,
      })
    })
    .catch((error) => {
      alert('그룹의 관리자 명단에 해당 멤버를 추가하는 과정에서 오류가 발생하였습니다. :', error)
    })
    .then(() => {
      setModalOpen(false)
    })
  }, member)

  const onClickGiveBadge = useCallback(() => {
    alert('준비중입니다.')
  }, [member])

  return (
    <>
    <div className={styles.member} key={index}>
      <img src={member.photoURL} alt="member profile" />
      <div>
        <span>{member.displayName}</span>
        <span>{member.status}</span>
        <span>가입일 : {member.joinedDate}</span>
      </div>
      <ul>
        <li onClick={onClickRemove}>강퇴</li>
        <li onClick={onClickEntrust}>권한 부여</li>
        <li onClick={onClickGiveBadge}>뱃지 부여</li>
      </ul>
    </div>

    <Modal
        size='mini'
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Modal.Header>관리자 권한 부여</Modal.Header>
        <Modal.Content>
          해당 멤버에게 관리자 권한을 부여하시겠습니까?
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setModalOpen(false)}>
            아니오
          </Button>
          <Button positive onClick={giveAdmin}>
            네
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default Admin_Members_Member