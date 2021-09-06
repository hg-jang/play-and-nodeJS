import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Button } from 'semantic-ui-react'
import useInput from '../../hooks/useInput';
import styles from '../css/group.module.css'
import MemberCard from './MemberCard';
import MemberDetailModal from './MemberDetailModal';

const MemberList = () => {
  const [name, onChangeName] = useInput('')
  const { currentGroup } = useSelector((state) => state.group)

  const members = currentGroup.members.concat().sort((a, b) => a.displayName - b.displayName)
  const [memberList, setMemberList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detailedMember, setDetailedMember] = useState({}) // 상세 정보 보여 줄 타겟 정보

  useEffect(() => {
    if(name) {
      setMemberList(members.filter(el => el.displayName.includes(name)))
    } else {
      setMemberList(members)
    }
  }, [name])

  return (
    <>
      <div className={styles.list_input_container}>
        <Input value={name} placeholder="tex name..." onChange={onChangeName} />
      </div>
      <div className={styles.member_list}>
        {
          memberList.length !== 0 ?
          <div className={styles.list_container}>
            {memberList.map((member, index) => (
              <MemberCard member={member} index={index} setIsModalOpen={setIsModalOpen} setDetailedMember={setDetailedMember} />
            ))}

            <div className={styles.member_card}>
              <div className={styles.top}>
                <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="default profile img" />
              </div>
              <div className={styles.mid}>
                <span className={styles.name}>더미요</span>
                <span className={styles.status}>테스트입니다.</span>
              </div>
              <div className={styles.bot}>
                <Button primary>Look Detail</Button>
              </div>
            </div>

            <div className={styles.member_card}>
              <div className={styles.top}>
                <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="default profile img" />
              </div>
              <div className={styles.mid}>
                <span className={styles.name}>더미요</span>
                <span className={styles.status}>테스트입니다.</span>
              </div>
              <div className={styles.bot}>
                <Button primary>Look Detail</Button>
              </div>
            </div>

            <div className={styles.member_card}>
              <div className={styles.top}>
                <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="default profile img" />
              </div>
              <div className={styles.mid}>
                <span className={styles.name}>더미요</span>
                <span className={styles.status}>테스트입니다.</span>
              </div>
              <div className={styles.bot}>
                <Button primary>Look Detail</Button>
              </div>
            </div>

            <div className={styles.member_card}>
              <div className={styles.top}>
                <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="default profile img" />
              </div>
              <div className={styles.mid}>
                <span className={styles.name}>더미요</span>
                <span className={styles.status}>테스트입니다.</span>
              </div>
              <div className={styles.bot}>
                <Button primary>Look Detail</Button>
              </div>
            </div>

            <div className={styles.member_card}>
              <div className={styles.top}>
                <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="default profile img" />
              </div>
              <div className={styles.mid}>
                <span className={styles.name}>더미요</span>
                <span className={styles.status}>테스트입니다.</span>
              </div>
              <div className={styles.bot}>
                <Button primary>Look Detail</Button>
              </div>
            </div>

            <div className={styles.member_card}>
              <div className={styles.top}>
                <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="default profile img" />
              </div>
              <div className={styles.mid}>
                <span className={styles.name}>더미요</span>
                <span className={styles.status}>테스트입니다.</span>
              </div>
              <div className={styles.bot}>
                <Button primary>Look Detail</Button>
              </div>
            </div>

            <div className={styles.member_card}>
              <div className={styles.top}>
                <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="default profile img" />
              </div>
              <div className={styles.mid}>
                <span className={styles.name}>더미요</span>
                <span className={styles.status}>테스트입니다.</span>
              </div>
              <div className={styles.bot}>
                <Button primary>Look Detail</Button>
              </div>
            </div>

            <div className={styles.member_card}>
              <div className={styles.top}>
                <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="default profile img" />
              </div>
              <div className={styles.mid}>
                <span className={styles.name}>더미요</span>
                <span className={styles.status}>테스트입니다.</span>
              </div>
              <div className={styles.bot}>
                <Button primary>Look Detail</Button>
              </div>
            </div>


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