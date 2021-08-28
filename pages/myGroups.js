import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fbaseFirestore } from '../src/fbase'
import Link from 'next/link'
import styles from '../src/css/myGroups.module.css'
import classNames from 'classnames'
import GroupCard from '../src/components/GroupCard'

const myGroups = () => {
  const uid = useSelector((state) => state.auth.currentUser?.uid)
  const [groupList, setGroupList] = useState([])

  const getTeamList = async () => {
    try {
      const joiningGroup = await fbaseFirestore.collection('whole users').doc(uid).collection('joining groups').get()

      joiningGroup.forEach(async (group) => {
        let groupObj = {}
        
        const docRef_1 = await fbaseFirestore.collection(group.data().groupName).doc('group information').get()
        if(docRef_1.exists) {
          groupObj = {
            ...groupObj,
            groupName: docRef_1.data().groupName,
            groupIntroduce: docRef_1.data().groupIntroduce,
            numberOfMember: docRef_1.data().numberOfMember,
            createdDate: docRef_1.data().createdDate
          }
        }

        const docRef_2 = await fbaseFirestore.collection(group.data().groupName).doc('group data').collection('admins').doc(uid).get()
        if(docRef_2.exists) {
          groupObj = {
            ...groupObj,
            isAdmin: true,
          }
        }

        const docRef_3 = await fbaseFirestore.collection(group.data().groupName).doc('group data').collection('members').doc(uid).get()
        if(docRef_3.exists) {
          groupObj = {
            ...groupObj,
            joinedDate: Number(String(docRef_3.data().joinedDate).slice(0, 8))
          }
        }

        setGroupList(prevGroupList => [...prevGroupList, groupObj])
      })
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTeamList()
  }, [])

  return (
    <div className={styles.my_groups}>
      <div className={styles.joined_groups}>
        <div className={classNames({["container"]: true, [styles.container__joined_groups]: true})}>
          <h1>가입한 그룹</h1>
          <div>
            {groupList.map((group, index) => <GroupCard group={group} index={index} />)}
          </div>
        </div>
      </div>
      <div className={styles.new_group}>
        <div className={classNames({["container"]: true, [styles.container__new_group]: true})}>
          <div className="button__index"><Link href="/createGroup"><a>그룹 생성하기</a></Link></div>
          <div className="button__index"><Link href="/joinGroup"><a>그룹 가입하기</a></Link></div>
        </div>
      </div>
    </div>
  )
}

export default myGroups