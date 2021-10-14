import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { fbaseFirestore } from "../fbase";
import { v4 as uuidv4 } from 'uuid'
import { ADD_COMMENT } from "../../reducers/group";
import { getDateWithTime } from "./PostForm";
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
      date: getDateWithTime(),
      like: [],
    }
    fbaseFirestore.collection(group).doc('group data').collection('posts').doc(post.id).collection('comments').doc(id)
    .set(commentObj)
    .then(() => {
      dispatch({
        type: ADD_COMMENT,
        data: {
          comment: commentObj,
          postId: post.id,
        }
      })
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      setComment('')
    })
  }, [post, comment])

  return (
    <div className={styles.comment_form}>
      <input type="text" className="input__text__underline" placeholder="댓글을 적어주세요" value={comment} onChange={onChangeComment} />
      <div>
        <Button.Group>
          <Button size="tiny" compact onClick={onClickCancel}>취소</Button>
          <Button primary size="tiny" compact onClick={onClickAddComment}>댓글 작성</Button>
        </Button.Group>
      </div>
    </div>
  )
}

export default CommentForm