import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Icon } from 'semantic-ui-react'
import { fbaseFirestore } from '../fbase'
import useInput from '../../hooks/useInput'
import { v4 as uuidv4 } from 'uuid'
import { getDate } from './PostForm'
import { useSelector } from 'react-redux'
import styles from '../css/group.module.css'

const ChatForm = () => {
  const router = useRouter()
  const { group } = router.query

  const { currentUser } = useSelector((state) => state.auth)

  const [chat, onChangeChat, setChat] = useInput('')

  const onClickSendChat = useCallback(() => {
    const id = uuidv4()

    const chatObj = {
      id: id,
      date: getDate(),
      content: chat,
      chatWriterUID: currentUser.uid,
      chatWriterDisplayName: currentUser.displayName,
      chatWriterPhotoURL: currentUser.photoURL,
    }

    fbaseFirestore.collection(group).doc('group data').collection('chats').doc(id)
    .set(chatObj)
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      setChat('')
    })
  }, [chat])

  return (
    <div className={styles.chat_form}>
      <input type="text" placeholder="go chat" className="input__text__underline" value={chat} onChange={onChangeChat} />
      <Icon name="send" size="large" onClick={onClickSendChat} />
    </div>
  )
}

export default ChatForm