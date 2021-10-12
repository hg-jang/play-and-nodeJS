import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { fbaseFirestore } from '../src/fbase'
import { Button } from 'semantic-ui-react'
import styles from "../src/css/create-group.module.css"
import classNames from 'classnames'

export const getDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()

  month = month >= 10 ? month : `0${month}`
  date = date >= 10 ? date : `0${date}`

  return `${year}${month}${date}`
}

const create_group = () => {
  const { currentUser } = useSelector((state) => state.auth)

  const router = useRouter()
  const [groupInfo, setGroupInfo] = useState({
    groupName: '',
    groupIntroduce: ''
  })

  const { groupName, groupIntroduce } = groupInfo

  function onChangeInput(e) {
    const { name, value } = e.target
    setGroupInfo({
      ...groupInfo,
      [name]: value
    })
  }

  const onClickCreateGroup = () => {
    if(groupName.length === 0) {
      alert('그룹 이름을 입력 해주세요.')
    } else if(groupIntroduce.length === 0) {
      alert('그룹 소개를 입력 해주세요.')
    } else {
      fbaseFirestore.collection(groupName).get().then((querySnapshot) => {
        if(querySnapshot.docs.length > 0) {
          // 해당 그룹명의 콜렉션이 이미 존재
          alert('해당 그룹명이 이미 존재합니다. ㅜㅜ')
        } else {
          // 해당 그룹명의 콜렉션이 없음.
          try {
            // group_information 문서 작성
            fbaseFirestore.collection(groupName).doc('group information').set(groupInfo)
            .then(() => {
              fbaseFirestore.collection(groupName).doc('group information').set({
                createdDate: getDate(),
                numberOfMember: 1
              }, { merge: true})
            })
            // group_data의 admins collection 에 유저 문서 작성
            .then(() => {
              fbaseFirestore.collection(groupName).doc('group data').collection('admins').doc(currentUser.uid).set({
                displayName: currentUser.displayName,
                uid: currentUser.uid,
              })
            })
            // group_data의 members collection 에 유저 문서 작성
            .then(() => {
              fbaseFirestore.collection(groupName).doc('group data').collection('members').doc(currentUser.uid).set({
                displayName: currentUser.displayName,
                uid: currentUser.uid,
                photoURL: currentUser.photoURL,
                joinedDate: getDate(),
              })
            })
            // whole_users - 유저.uid 문서 - 가입한 그룹 collection 에 생성 한 그룹 문서 추가
            .then(() => {
              const docRef = fbaseFirestore.collection('whole users').doc(currentUser.uid).collection('joining groups').doc(groupName)
              docRef.set({
                groupName: groupName,
                groupIntroduce: groupIntroduce,
                isAdmin: true,
                joinedDate: getDate(),
                createdDate: getDate(),
                numberOfMember: 1
              }, { merge: true })
            })
            // whole_groups 에 생성한 그룹의 문서 추가
            .then(() => {
              fbaseFirestore.collection('whole groups').doc(groupName).set({
                groupName: groupName,
                groupIntroduce: groupIntroduce
              })
            })
            .then(() => {
              alert('그룹 생성을 완료하였습니다!!')
              router.push('/')
            })
          } catch(error) {
            alert('그룹을 생성하는 데에 실패하였습니다. : ', error)
          }
        }
      })
    }
  }

  return (
    <>
      <div className={styles.createGroup}>
        <div className={classNames({["container"]: true, [styles.container__public_createGroup]: true})}>
          <h1 className={styles.title}>그룹 생성하기</h1>
          <div className={styles.createGroup__form}>
            <div className={styles.createGroup__name}>
              <span>그룹 이름 :&nbsp;</span><input type="text" name="groupName" className="input__text" onChange={onChangeInput} value={groupName} />
            </div>
            <div className={styles.createGroup__introduce}>
              <span>그룹 소개 :&nbsp;</span><input type="text" name="groupIntroduce" className="input__text" onChange={onChangeInput} value={groupIntroduce} />
            </div>
          </div>
          <Button primary onClick={onClickCreateGroup} >생성하기</Button>
        </div>
      </div>
    </>
  )
}

export default create_group