import React from 'react';
import PostForm from './PostForm';
import styles from '../css/Community.module.css'

const Community = () => {

  return (
    <div className={styles.community}>
      <div className={styles.post_container}>
        <PostForm />
        {/* <Post /> */}
      </div>
      <div className={styles.chat_container}>
        {/* 채팅 */}
      </div>
    </div>
  )
}

export default Community;
