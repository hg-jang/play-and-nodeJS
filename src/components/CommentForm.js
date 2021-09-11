import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextArea } from "semantic-ui-react";
import { fbaseFirestore } from "../fbase";
import { v4 as uuidv4 } from 'uuid'
import { ADD_COMMENT } from "../../reducers/group";
import { getDate } from "./PostForm";
import useInput from "../../hooks/useInput";
import styles from '../css/group.module.css'

const CommentForm = ({ post }) => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const [comment, onChangeComment, setComment] = useInput('')

  const onClickCancel = useCallback(() => {
    setComment('')
  }, [])

  const onClickAddComment = useCallback(() => {
    const id = uuidv4()
    const commentObj = {
      commentWriterUID: currentUser.uid,
      commentWriterPhotoURL: currentUser.photoURL,
      commentWriterDisplayName: currentUser.displayName,
      content: comment,
      id: id,
      date: getDate(),
    }
    console.log(commentObj);
    fbaseFirestore.collection(group).doc('group data').collection('posts').doc(post.id).collection('comments').doc(id)
    .set(commentObj)
    .then(() => {
      dispatch({
        type: ADD_COMMENT,
        data: {
          comment: commentObj,
          id: post.id,
        }
      })
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      setComment('')
    })
  }, [group, post, comment])

  return (
    <div className={styles.comment_form}>
      <TextArea placeholder="댓글을 적어주세요" value={comment} onChange={onChangeComment} />
      <div>
        <Button.Group>
          <Button onclick={onClickCancel}>취소</Button>
          <Button primary onClick={onClickAddComment}>작성</Button>
        </Button.Group>
      </div>
    </div>
  )
}

export default CommentForm