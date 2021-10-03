import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { fbaseFirestore } from '../../src/fbase'
import { LOAD_MEMBERS, LOAD_GAMES, LOAD_POSTS, ADD_CHAT, LOAD_GROUP_SUCCESS } from '../../reducers/group'
import { Loader } from 'semantic-ui-react'
import GameRecords from '../../src/components/GameRecords'
import Ranking from "../../src/components/Ranking"
import MemberList from "../../src/components/MemberList"
import Community from "../../src/components/Community"
import GameRecordForm from "../../src/components/GameRecordForm"
import Ad from "../../src/components/Ad"
import styles from '../../src/css/group.module.css'

const group_index = () => {
  const router = useRouter()
  const { group } = router.query
  
  const dispatch = useDispatch()
  const { content, currentGroup, isGroupLoading, isGroupLoaded, isMemberLoaded, isGameLoaded, isPostLoaded } = useSelector((state) => state.group)

  const loadMembers = () => {
    let membersArr = []

    fbaseFirestore.collection(group).doc('group data').collection('members')
    .get()
    .then((members) => {
      members.forEach((member) => {
        const memberObj = {
          displayName: member.data().displayName,
          photoURL: member.data().photoURL,
          uid: member.data().uid,
          joinedDate: member.data().joinedDate,
          rating: member.data().rating,
          startRating: member.data().startRating,
          allGames: member.data().allGames,
          winnedGames: member.data().winnedGames,
          losedGames: member.data().losedGames,
          status: member.data().status,
        }
        membersArr = membersArr.concat(memberObj)
      })
    })
    .catch((error) => {
      console.log(error)
    })
    .then(() => {
      dispatch({
        type: LOAD_MEMBERS,
        data: membersArr,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const loadGames = () => {
    let gamesArr = []
    fbaseFirestore.collection(group).doc('group data').collection('games')
    .get()
    .then((games) => {
      games.forEach((game) => {
        const gameObj = {
          winnerRatingAfter: game.data().winnerRatingAfter,
          loserRatingAfter: game.data().loserRatingAfter,
          winners: game.data().winners,
          losers: game.data().losers,
          ratingChange: game.data().ratingChange,
          playedDate: game.data().playedDate,
          writtenDate: game.data().writtenDate,
          id: game.data().id,
        }
        gamesArr = gamesArr.concat(gameObj)
      })
    })
    .catch((error) => {
      console.log(error)
    })
    .then(() => {
      dispatch({
        type: LOAD_GAMES,
        data: gamesArr,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const loadPosts = async () => {
    let postsArr = []
    let postObj = {}

    const querySnapshot = await fbaseFirestore.collection(group).doc('group data').collection('posts').orderBy('date', "desc").get()

    if(querySnapshot.length === 0) { return postsArr }
    querySnapshot.forEach((post) => {
      postObj = {
        ...postObj,
        writerUID: post.data().writerUID,
        writerPhotoURL: post.data().writerPhotoURL,
        writerDisplayName: post.data().writerDisplayName,
        content: post.data().content,
        imagePaths: post.data().imagePaths,
        date: post.data().date,
        id: post.data().id,
      }
      postsArr = postsArr.concat(postObj)
    })
    
    dispatch({
      type: LOAD_POSTS,
      data: postsArr
    })
  }


  const loadChatsRealtime = () => {
    fbaseFirestore.collection(group).doc('group data').collection('chats').orderBy('date')
    .onSnapshot((chats) => {
      chats.docChanges().forEach((change) => {
        if(change.type === 'added') {
          const chatObj = {
            id: change.doc.data().id,
            date: change.doc.data().date,
            content: change.doc.data().content,
            chatWriterUID: change.doc.data().chatWriterUID,
            chatWriterDisplayName: change.doc.data().chatWriterDisplayName,
            chatWriterPhotoURL: change.doc.data().chatWriterPhotoURL,
          }
          dispatch({
            type: ADD_CHAT,
            data: chatObj,
          })
        }
      })
    })
  }
  
  useEffect(() => {
    if(router.query.group) {
      loadMembers()
      loadGames()
      loadPosts()
    }
  }, [router])
  useEffect(() => {
    if(router.query.group) {
      loadChatsRealtime()
    }
  }, [router])

  useEffect(() => {
    if(isMemberLoaded && isGameLoaded && isPostLoaded) {
      dispatch({
        type: LOAD_GROUP_SUCCESS,
      })
    }
  }, [isMemberLoaded, isGameLoaded, isPostLoaded])

  return (
    <>
    {isGroupLoading && <Loader>Loading</Loader>}
    {isGroupLoaded && 
    <>
      {content === 'community' && <Community />}
      {content === 'game records' && <GameRecords />}
      {(content === 'ranking' || content === 'member list') &&
      <div className={styles.group_container_rk_ml}>
        <div className={styles.contents}>
          {content === 'ranking' && <Ranking />}
          {content === 'member list' && <MemberList />}
        </div>
        <div className={styles.asides}>
          <div className={styles.aside1}>
            <GameRecordForm games={currentGroup.games} />
          </div>
          <div className={styles.aside2}>
            <Ad />
          </div>
        </div>
      </div>}
    </>}
    </>
  )
}

export default group_index