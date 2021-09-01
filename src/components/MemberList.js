import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
// import MemberDetailModal from '../public/component/MemberDetailModal';
import styles from '../css/group.module.css'
import MemberCard from './MemberCard';

const MemberList = () => {
  const [name, onChangeName] = useInput('')
  const { currentGroup } = useSelector((state) => state.group)

  const members = currentGroup.members.concat().sort((a, b) => a.displayName - b.displayName)
  const [memberList, setMemberList] = useState([])
  // const [isModalOpen, setIsModalOpen] = useState(false)
  // const [playerDetailTarget, setPlayerDetailTarget] = useState({}) // 상세 정보 보여 줄 타겟 정보

  // function showDetail(e) {
  //   const searchedTarget = searchPlayerFromGroupPlayers(e.target)

  //   setPlayerDetailTarget(searchedTarget)
  //   setIsModalOpen(true)
  // }

  // function searchPlayerFromGroupPlayers(target) {
  //   const searchedTarget = groupPlayers.find(player => player.name === target.dataset.name)
  //   return searchedTarget
  // }


  useEffect(() => {
    if(name) {
      setMemberList(members.filter(el => el.displayName.includes(name)))
    } else {
      setMemberList(members)
    }
  }, [name])

  return (
    <>
      <input type="text" className="filter__memberList" placeholder="text name..." value={name} onChange={onChangeName} />
      <div className={styles.member_list}>
        {
          memberList.length !== 0 ?
          <div className={styles.list_container}>
            {memberList.map((member, index) => (
              <MemberCard member={member} index={index} />
            ))}
          </div>
          :
          <div className={styles.no_members}>멤버가 존재하지 않습니다.</div>
        }
        {/* <MemberDetailModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} groupName={groupName} playerDetailTarget={playerDetailTarget} setPlayerDetailTarget={setPlayerDetailTarget} groupPlayers={groupPlayers} /> */}
      </div>
    </>
  )
};

export default MemberList