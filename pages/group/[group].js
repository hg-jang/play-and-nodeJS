import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { fbaseFirestore } from '../../src/fbase'
// import styles from '../../src/public/css/group_main.module.css'
// import Nav from "../../src/public/component/Nav"
// import Ranking from "../../src/public/component/Ranking"
// import MemberList from "../../src/public/component/MemberList"
// import Community from "../../src/public/component/Community"
// import RecentGame from "../../src/public/component/RecentGame"
// import Ad from "../../src/public/component/Ad"
import { SET_GAMES } from '../../reducers/group'

const group_index = () => {
  const router = useRouter()
  const { group } = router.query
  
  const dispatch = useDispatch()
  const { currentGroup } = useSelector((state) => state.group)

  
  // const groupName = group
  // const [content, setContent] = useState('community')
  // const [groupPlayers, setGroupPlayers] = useState([]);
  // const [wholeGames, setWholeGames] = useState([]);

  const getGames = () => {
    let gamesArr = []
    fbaseFirestore.collection(group).doc('group data').collection('games').get()
    .then((games) => {
      games.forEach((game) => {
        console.log('2 :', game.data());
        const gameObj = {
          winnerRatingAfter: game.data().winnerRatingAfter,
          loserRatingAfter: game.data().loserRatingAfter,
          winners: game.data().winners,
          losers: game.data().losers,
          ratingChange: game.data().ratingChange,
          percentage: game.data().percentage,
          date: game.data().date,
          time: game.data().writeTime,
          id: `${game.data().date}-${game.data().writeTime}`,
        }
        gamesArr = gamesArr.concat(gameObj)
      })
    })
    .then(() => {
      dispatch({
        type: SET_GAMES,
        data: gamesArr,
      })
    })
  }

  // const getMembers = () => {
  //   let membersArr = []

  //   dbService.collection(group).doc('group data').collection('members').get()
  //   .then((members) => {
  //     members.forEach((member) => {
  //       const memberObj = {

  //       }
  //     })
  //   })
  // }


  useEffect(() => {
    if(router.query.group) {
      getGames()
      getMembers()
    }
  }, [router])

  useEffect(() => {
    console.log('페이지 : ', currentGroup);
  }, [currentGroup])

  return (
    <p>그룹 메인</p>
    // <div className={styles.publicContainer}>
    //   <Nav setContent={setContent} />
    //   <div className={styles.teamContainer}>
    //     {content === 'ranking' && <Ranking groupPlayers={groupPlayers} />}
    //     {content === 'member list' && <MemberList groupName={groupName} groupPlayers={groupPlayers} />}
    //     {content === 'community' && <Community groupName={groupName}/>}
    //   </div>
    //   {content !== 'community' &&
    //   <div className={styles.aside}>
    //     <div className={styles.aside1}>
    //       <RecentGame wholeGames={wholeGames} />
    //     </div>
    //     <div className={styles.aside2}>
    //       <Ad />
    //     </div>
    //   </div>
    //   }
    // </div>
  )
}

export default group_index