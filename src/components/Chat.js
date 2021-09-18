import React from "react";
import { useSelector } from "react-redux";
import styles from '../css/group.module.css'
import classNames from 'classnames'

const Chat = ({ chat }) => {
  const uid = useSelector((state) => state.auth.currentUser?.uid)

  return (
    <>
    {chat.chatWriterUID === uid
    ? <div className={classNames({[styles.chat]: true, [styles.my_chat]: true, ["float__right"]: true,})}>
        <span className={styles.chat_writer}>내가 보낸 말</span>
        <span className={styles.chat_content}>{chat.content}</span>
        <span className={styles.chat_date}>{chat.date}</span>
      </div>
    : <div className={classNames({[styles.chat]: true, ["float__left"]: true,})}>
        <img src={chat.chatWriterPhotoURL} alt="chat writer" />
        <div>
          <span className={styles.chat_writer}>{chat.chatWriterDisplayName}</span>
          <span className={styles.chat_content}>{chat.content}</span>
          <span className={styles.chat_date}>{chat.date}</span>
        </div>
      </div>
    }
    </>
  )
}

export default Chat