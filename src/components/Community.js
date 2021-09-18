import React from 'react';
import { useSelector } from "react-redux";
import PostForm from './PostForm';
import Post from './Post'
import Chat from './Chat'
import ChatForm from './ChatForm'
import styles from '../css/group.module.css'
import classNames from 'classnames'

const Community = () => {
  const posts = useSelector((state) => state.group.currentGroup?.posts)
  const chats = useSelector((state) => state.group.currentGroup?.chats)

  return (
    <div className={styles.group_container_cm}>
      <div className={styles.post_container}>
        <PostForm />
        <div className={styles.posts}>
          {posts && posts.map((post) => <Post post={post}/>)}
        </div>
      </div>
      <div className={styles.chat_container}>
        <div className={classNames({[styles.chats]: true, ["clearfix"]: true,})}>
          {chats && chats.map((chat) => <Chat chat={chat} />)}
        </div>
        <ChatForm />
      </div>
    </div>
  )
}

export default Community