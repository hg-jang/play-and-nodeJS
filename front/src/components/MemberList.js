import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Button } from 'semantic-ui-react'
import useInput from '../../hooks/useInput';
import styles from '../css/group.module.css'
import MemberCard from './MemberCard';
import MemberDetailModal from './MemberDetailModal';

const MemberList = () => {
  const [name, onChangeName] = useInput('')
  const members = useSelector((state) => state.group.currentGroup?.members.concat().sort((a, b) => a.displayName - b.displayName))

  const [memberList, setMemberList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detailedMember, setDetailedMember] = useState({}) // 상세 정보 보여 줄 타겟 정보

  const isEmpty = (obj) => {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false
    }
    return true
  }
  useEffect(() => {
    if(name) {
      setMemberList(members.filter(el => el.displayName.includes(name)))
    } else {
      setMemberList(members)
    }
  }, [name])

  useEffect(() => {
    if(isEmpty(detailedMember)) {
      setIsModalOpen(false)
    } else {
      console.log('리스트 :', detailedMember);
      setIsModalOpen(true)
    }
  }, [detailedMember])
  useEffect(() => {
    console.log('리스트 :', isModalOpen);
  }, [isModalOpen])

  return (
    <>
      <div className={styles.list_input_container}>
        <Input value={name} placeholder="tex name..." onChange={onChangeName} />
      </div>
      <div className={styles.member_list}>
        {memberList.length !== 0 ?
          <div className={styles.list_container}>
            {memberList.map((member, index) => (
              <MemberCard member={member} index={index} setIsModalOpen={setIsModalOpen} setDetailedMember={setDetailedMember} />
            ))}
          </div>
          :
          <div className={styles.no_members}>멤버가 존재하지 않습니다.</div>
        }
        <MemberDetailModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} detailedMember={detailedMember} setDetailedMember={setDetailedMember} />
      </div>
    </>
  )
};

export default MemberList