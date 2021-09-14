import React, { useCallback } from "react";
import { fbaseFirestore } from "../fbase";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import { DISLIKE_COMMENT, LIKE_COMMENT } from "../../reducers/group";
import styles from '../css/group.module.css'

const Comment = ({ postId, comment }) => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const uid = useSelector((state) => state.auth.currentUser?.uid)

  const onClickLikeComment = useCallback(() => {
    const docRef = fbaseFirestore.collection(group).doc('group data').collection('posts').doc(postId).collection('comments').doc(comment.id)
    let prevLike = []

    docRef.get()
    .then((doc) => {
      prevLike = [ ...doc.data().like ]
    })
    docRef.set({
      like: [...prevLike, uid]
    }, { merge: true })
    .then(() => {
      dispatch({
        type: LIKE_COMMENT,
        data: {
          postId: postId,
          commentId: comment.id,
          who: uid,
        }
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }, [postId, comment])

  const onClickDislikeComment = useCallback(() => {
    const docRef = fbaseFirestore.collection(group).doc('group data').collection('posts').doc(postId).collection('comments').doc(comment.id)
    let prevLike = []

    docRef.get()
    .then((doc) => {
      prevLike = [...doc.data().like]
    })
    docRef.set({
      like: prevLike.filter((like) => like !== uid)
    }, { merge: true })
    .then(() => {
      dispatch({
        type: DISLIKE_COMMENT,
        data: {
          postId: postId,
          commentId: comment.id,
          who: uid,
        }
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <div className={styles.comment}>
      <img src={comment.commentWriterPhotoURL} alt="writer image" />
      <div>
        <div className={styles.name_date}>
          <span className={styles.name}>{comment.commentWriterDisplayName}</span>
          <span className={styles.date}>{comment.date}</span>
        </div>
        <div className={styles.content}>
          {comment.content}
        </div>
        <div className={styles.like}>
          {comment.like.find((like) => like === uid)
          ? <Icon name="heart" color="red" onClick={onClickDislikeComment} />
          : <Icon name="heart outline" color="red" onClick={onClickLikeComment} />
          }
        </div>
      </div>
    </div>
  )
}

export default Comment