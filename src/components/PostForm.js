import React from 'react'
import { useSelector } from 'react-redux';
import { Form, TextArea, Button } from 'semantic-ui-react'
import useInput from '../../hooks/useInput'
import styles from '../css/Community.module.css'

const PostForm = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const [post, onChangePost] = useInput('')

  return (
    <Form>
      <TextArea placeholder="내용을 적어주세요" value={post} onChange={onChangePost} />
      <div className={styles.buttons}>
        <Button secondary>사진 추가</Button>
        <Button primary>작성</Button>
      </div>
    </Form>
  )
}

export default PostForm