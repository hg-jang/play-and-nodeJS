import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { fbaseFirestore } from '../fbase';
import { LOAD_CHATS } from '../../reducers/group';
import PostForm from './PostForm';
import Post from './Post'
import Chat from './Chat'
import ChatForm from './ChatForm'
import styles from '../css/group.module.css'

const Community = () => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.group.currentGroup?.posts)

  const loadChats = () => {
    let chatsArr = []

    fbaseFirestore.collection(group).doc('group data').collection('chats').orderBy('date', 'desc')
    .get()
    .then((chats) => {
      chats.forEach((chat) => {
        if(!chat.exists) {
          return chatsArr
        } else {
          const chatObj = {
            id: chat.data().id,
            date: chat.data(),
            content: chat.data(),
            chatWriterUID: chat.data().chatWriterUID,
            chatWriterDisplayName: chat.data().chatWriterDisplayName,
            chatWriterPhotoURL: chat.data().chatWriterPhotoURL,
          }
          chatsArr = [...chatsArr, chatObj]
        }
      })
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      dispatch({
        type: LOAD_CHATS,
        data: chatsArr,
      })
    })
  }

  useEffect(() => {
    if(router) {
      loadChats()
    }
  }, [router])

  return (
    <div className={styles.group_container_cm}>
      <div className={styles.post_container}>
        <PostForm />
        <div className={styles.posts}>
          {posts && posts.map((post) => <Post post={post}/>)}
        </div>
      </div>
      <div className={styles.chat_container}>
        <Chat />
        <ChatForm />
      </div>
    </div>
  )
}

export default Community