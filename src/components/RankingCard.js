import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../css/group.module.css'

const RankingCard = ({ name, type }) => {
  const { currentGroup } = useSelector((state) => state.group)
  const [ranking, setRanking] = useState([])
  
  // rating 순으로 정렬
  const members = currentGroup.members.concat().sort((a, b) => b.rating - a.rating)

  useEffect(() => {
    switch(type) {
      case '전체':
        if(name) {
          setRanking(members.filter(el => el.displayName.includes(name)))
        } else {
          setRanking(members)
        }
        break;
      default:
        setRanking(members)
        break;
    }
  }, [name, type])

  return (
    <>
      {currentGroup.members === null ?
      <div className={styles.no_rankings}>가입된 멤버가 한 명도 없습니다.</div>
      :
      <div className={styles.ranking}>
      {ranking.map((member,index) => (
        <div className={styles.ranking_card} key={index}>
          <div className={styles.left}>
            <div className={styles.profile_img}>
              {
              member.photoURL ?
              <img src={member.photoURL} alt="member profile" /> :
              <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="profile-img" />
              }
            </div>
            <div className={styles.name}>
              {member.displayName}
            </div>
          </div>
          <div className={styles.mid}>
            <span className={styles.rating}>
              <span>{member.rating}</span>  
              <span>Rating</span>
            </span>
            <div className={styles.score}>
              <span className={styles.win}>
                <span>{member.winnedGames}</span>
                <span>승</span>
              </span>
              <span className={styles.lose}>
                <span>{member.losedGames}</span>
                <span>패</span>
              </span>
            </div>
          </div>
          <div className={styles.right}>
            <span className={styles.ranking}>{index + 1}</span>
            <span>Ranking</span>
          </div>
        </div>
      ))}
      </div>
      }
    </>
  )
}

export default RankingCard