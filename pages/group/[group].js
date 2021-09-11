import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { fbaseFirestore } from '../../src/fbase'
import { LOAD_POSTS, LOAD_GAMES, LOAD_MEMBERS } from '../../reducers/group'
import Ranking from "../../src/components/Ranking"
import MemberList from "../../src/components/MemberList"
import Community from "../../src/components/Community"
import GameRecords from "../../src/components/GameRecords"
import Ad from "../../src/components/Ad"
import styles from '../../src/css/group.module.css'

const group_index = () => {
  const router = useRouter()
  const { group } = router.query
  
  const dispatch = useDispatch()
  const { content, currentGroup } = useSelector((state) => state.group)

  const loadGames = () => {
    let gamesArr = []
    fbaseFirestore.collection(group).doc('group data').collection('games').get()
    .then((games) => {
      games.forEach((game) => {
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
        type: LOAD_GAMES,
        data: gamesArr,
      })
    })
  }

  const loadMembers = () => {
    let membersArr = []

    fbaseFirestore.collection(group).doc('group data').collection('members').get()
    .then((members) => {
      members.forEach((member) => {
        const memberObj = {
          displayName: member.data().displayName,
          photoURL: member.data().photoURL,
          uid: member.data().uid,
          joinedDate: member.data().joinedDate,
          rating: member.data().rating,
          start_rating: member.data().start_rating,
          allGames: member.data().allGames,
          winnedGames: member.data().winnedGames,
          losedGames: member.data().losedGames,
          status: member.data().status,
        }
        membersArr = membersArr.concat(memberObj)
      })
    })
    .then(() => {
      dispatch({
        type: LOAD_MEMBERS,
        data: membersArr,
      })
    })
  }

  const loadPosts = useCallback(() => {
    let postsArr = []

    fbaseFirestore.collection(group).doc('group data').collection('posts').orderBy('date', "desc").get()
    .then((posts) => {

      if(posts.length === 0) {return postsArr}

      posts.forEach((post) => {
        const postsObj = {
          writerUID: post.data().writerUID,
          writerPhotoURL: post.data().writerPhotoURL,
          writerDisplayName: post.data().writerDisplayName,
          content: post.data().content,
          imagePaths: post.data().imagePaths,
          date: post.data().date,
          id: post.data().id,
        }
        postsArr = postsArr.concat(postsObj)
      })
    })
    .then(() => {
      dispatch({
        type: LOAD_POSTS,
        data: postsArr
      })
    })
  }, [])


  useEffect(() => {
    if(router.query.group) {
      loadGames()
      loadMembers()
      loadPosts()
    }
  }, [router])

  return (
    <>
      {content === 'community' && <Community />}
      {
        content !== 'community' &&
        <div className={styles.group_container_rk_ml}>
          <div className={styles.contents}>
            {content === 'ranking' && <Ranking />}
            {content === 'member list' && <MemberList />}
          </div>
          <div className={styles.asides}>
            <div className={styles.aside1}>
              <GameRecords games={currentGroup.games} />
            </div>
            <div className={styles.aside2}>
              <Ad />
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default group_index