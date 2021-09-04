import React, { useEffect, useState } from "react"
import { fbaseFirestore } from "../src/fbase"
import { useSelector } from "react-redux"
import useInput from "../hooks/useInput"
import styles from '../src/css/join-group.module.css'
import classNames from 'classnames'

const join_group = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const [filter, onChnageInput] = useInput('')
  
  const [wholeGroups, setWholeGroups] = useState([])
  const [filteredGroups, setFilteredGroups] = useState([])

  function onClickJoin(e) {
    const memberDocRef = fbaseFirestore.collection(e.target.dataset.group).doc('group data').collection('members').doc(currentUser.uid)
    const awaitorDocRef = fbaseFirestore.collection(e.target.dataset.group).doc('group data').collection('awaitors').doc(currentUser.uid)

    memberDocRef.get()
    .then((member) => {
      if(member.exists) {
        // 신청한 사람의 uid가 members에 존재 할 경우
        alert('이미 가입한 그룹입니다. :D')
      } else {
        // 신청한 사람의 uid가 members에 존재 하지 않을 경우
        awaitorDocRef.set({
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid
        })
      }
    })
  }

  const getWholeGroups = () => {
    fbaseFirestore.collection('whole groups').get()
    .then((groups) => {
      groups.forEach((group) => {
        setWholeGroups(wholeGroups => [...wholeGroups, {
          groupName: group.data().groupName,
          groupIntroduce: group.data().groupIntroduce
        }])
      })
    })
  }

  useEffect(() => {
    getWholeGroups()
  }, [])

  useEffect(() => {
    if(filter) {
      setFilteredGroups(wholeGroups.filter(el => el.groupName.includes(filter)))
    } else {
      setFilteredGroups([])
    }
  }, [filter])

  return (
    <div className={styles.joinGroup}>
      <div className={classNames({["container"]: true, [styles.container__public_joinGroup]: true})}>
        <input type="text" onChange={onChnageInput} value={filter} placeholder="원하는 그룹명을 입력하세요." />
        <div>
          {filteredGroups.map((el, index) => 
            <div className={styles.card} key={index}>
              <h1 className={styles.group_name}>{el.groupName}</h1>
              <h2 className={styles.group_introduce}>{el.groupIntroduce}</h2>
              <div onClick={onClickJoin} data-group={el.groupName}>가입 신청</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default join_group