import React from 'react';
import { useSelector } from "react-redux";
import PostForm from './PostForm';
import Post from './Post'
import styles from '../css/group.module.css'

const Community = () => {
  const posts = useSelector((state) => state.group.currentGroup?.posts)

  return (
    <div className={styles.group_container_cm}>
      <div className={styles.post_container}>
        <PostForm />
        <div className={styles.posts}>
          {posts && posts.map((post) => <Post post={post}/>)}
        </div>
      </div>
      <div className={styles.chat_container}>
        {/* 채팅 */}
      </div>
    </div>
  )
}

export default Community