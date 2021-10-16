import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fbaseFirestore } from '../src/fbase'
import { Button } from 'semantic-ui-react'
import { LOAD_GROUP_INIT } from '../reducers/group'
import Link from 'next/link'
import GroupCard from '../src/components/GroupCard'
import styles from '../src/css/my-groups.module.css'
import PublicLayout from '../src/layouts/PublicLayout'

const my_groups = () => {
  const [groupList, setGroupList] = useState([])

  const dispatch = useDispatch()
  const uid = useSelector((state) => state.auth.currentUser?.uid)
  

  const getGroupList = async () => {
    try {
      const joiningGroup = await fbaseFirestore.collection('whole users').doc(uid).collection('joining groups').get()

      joiningGroup.forEach(async (group) => {
        let groupObj = {}
        
        // 그룹 정보 가져오기
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

        // 관리자인지 여부 가져오기
        const docRef_2 = await fbaseFirestore.collection(group.data().groupName).doc('group data').collection('admins').doc(uid).get()
        if(docRef_2.exists) {
          groupObj = {
            ...groupObj,
            isAdmin: true,
          }
        }

        // 그룹에 가입한 날짜 가져오기
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
    getGroupList()
  }, [])
  useEffect(() => {
    dispatch({
      type: LOAD_GROUP_INIT,
    })
  })


  return (
    <PublicLayout>
      <div className={styles.my_groups}>
        <div className={styles.joined_groups}>
          <div className={styles.container__joined_groups}>
            <h1>가입한 그룹</h1>
            <div>
              {groupList.map((group, index) => <GroupCard group={group} index={index} />)}
            </div>
          </div>
        </div>
        <div className={styles.new_group}>
          <div className={styles.container__new_group}>
            <Button primary><Link href="/create-group"><a>그룹 생성하기</a></Link></Button>
            <Button primary><Link href="/join-group"><a>그룹 가입하기</a></Link></Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}

export default my_groups