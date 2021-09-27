import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { fbaseFirestore } from '../../src/fbase'
import { ADD_CHAT } from '../../reducers/group'
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

  // const loadChats = () => {
  //   let chatsArr = []

  //   fbaseFirestore.collection(group).doc('group data').collection('chats').orderBy('date')
  //   .get()
  //   .then((chats) => {
  //     chats.forEach((chat) => {
  //       if(!chat.exists) {
  //         return chatsArr
  //       } else {
  //         const chatObj = {
  //           id: chat.data().id,
  //           date: chat.data().date,
  //           content: chat.data().content,
  //           chatWriterUID: chat.data().chatWriterUID,
  //           chatWriterDisplayName: chat.data().chatWriterDisplayName,
  //           chatWriterPhotoURL: chat.data().chatWriterPhotoURL,
  //         }
  //         chatsArr = [...chatsArr, chatObj]
  //       }
  //     })
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  //   .then(() => {
  //     dispatch({
  //       type: LOAD_CHATS,
  //       data: chatsArr,
  //     })
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }

  const loadChatsRealtime = () => {
    fbaseFirestore.collection(group).doc('group data').collection('chats').orderBy('date')
    .onSnapshot((chats) => {
      console.log('onSnapshot 반응');
      chats.docChanges().forEach((change) => {
        console.log('새로운 chat :', change.doc.data());
        if(change.type === 'added') {
          console.log('added 감지 성공');
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
      // loadChats()
      loadChatsRealtime()
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