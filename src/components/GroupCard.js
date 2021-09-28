import React, { useCallback } from 'react'
import { fbaseFirestore } from '../fbase'
import { LOAD_POSTS, LOAD_GAMES, LOAD_MEMBERS } from '../../reducers/group'
import Link from 'next/link'
import { Icon } from 'semantic-ui-react'
import styles from '../css/my-groups.module.css'
import { useDispatch } from 'react-redux'

const GroupCard = ({ group, index }) => {
  const dispatch = useDispatch()
  
  const defaultSrc = 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg'

  const loadGames = () => {
    let gamesArr = []
    fbaseFirestore.collection(group.groupName).doc('group data').collection('games')
    .get()
    .then((games) => {
      games.forEach((game) => {
        const gameObj = {
          winnerRatingAfter: game.data().winnerRatingAfter,
          loserRatingAfter: game.data().loserRatingAfter,
          winners: game.data().winners,
          losers: game.data().losers,
          ratingChange: game.data().ratingChange,
          percentage: game.data().percentage,
          date: game.data().date,
          time: game.data().writeTime,
          id: `${game.data().date}-${game.data().writeTime}`,
        }
        gamesArr = gamesArr.concat(gameObj)
      })
    })
    .catch((error) => {
      console.log(error)
    })
    .then(() => {
      dispatch({
        type: LOAD_GAMES,
        data: gamesArr,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const loadMembers = () => {
    let membersArr = []

    fbaseFirestore.collection(group.groupName).doc('group data').collection('members')
    .get()
    .then((members) => {
      members.forEach((member) => {
        const memberObj = {
          displayName: member.data().displayName,
          photoURL: member.data().photoURL,
          uid: member.data().uid,
          joinedDate: member.data().joinedDate,
          rating: member.data().rating,
          start_rating: member.data().start_rating,
          allGames: member.data().allGames,
          winnedGames: member.data().winnedGames,
          losedGames: member.data().losedGames,
          status: member.data().status,
        }
        membersArr = membersArr.concat(memberObj)
      })
    })
    .catch((error) => {
      console.log(error)
    })
    .then(() => {
      dispatch({
        type: LOAD_MEMBERS,
        data: membersArr,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const loadPosts = async () => {
    let postsArr = []
    let postObj = {}

    const querySnapshot = await fbaseFirestore.collection(group.groupName).doc('group data').collection('posts').orderBy('date', "desc").get()

    if(querySnapshot.length === 0) { return postsArr }
    querySnapshot.forEach((post) => {
      postObj = {
        ...postObj,
        writerUID: post.data().writerUID,
        writerPhotoURL: post.data().writerPhotoURL,
        writerDisplayName: post.data().writerDisplayName,
        content: post.data().content,
        imagePaths: post.data().imagePaths,
        date: post.data().date,
        id: post.data().id,
      }
      postsArr = postsArr.concat(postObj)
    })
    
    dispatch({
      type: LOAD_POSTS,
      data: postsArr
    })
  }

  // 일반 사용자 페이지 접속 시 먼저 불러올 데이터들
  const onClickSetGroup = useCallback(() => {
    loadGames()
    loadMembers()
    loadPosts()
  }, [group])

  // 관리자 페이지 접속 시 먼저 불러올 데이터들
  const onClickSetAdmin = useCallback(() => {
    loadMembers()
  }, [group])

  return (
    <div className={styles.group_card} key={index}>
      <div className={styles.group_image}>
        <img src={defaultSrc} alt="team profile" />
        {group.isAdmin === true ? <Link href={`/admin/${group.groupName}`}><a><Icon fitted className={styles.setting} name='setting' size='large' onClick={onClickSetAdmin} /></a></Link> : <></>}
      </div>
      <h1 className={styles.team_name} onClick={onClickSetGroup}><Link href={`/group/${group.groupName}`}><a>{group.groupName}</a></Link></h1>
      <h2 className={styles.group_introduce}>{group.groupIntroduce}</h2>
      <ul className={styles.group_info}>
        <li className={styles.created_date}>
          <span className={styles.info_name}>그룹 생성일</span>
          <span className={styles.info_content}>{group.createdDate}</span>
        </li>
        <li className={styles.joined_date}>
          <span className={styles.info_name}>그룹 가입일</span>
          <span className={styles.info_content}>{group.joinedDate}</span>
        </li>
        <li className={styles.member_number}>
          <span className={styles.info_name}>그룹 멤버 수</span>
          <span className={styles.info_content}>{group.numberOfMember}</span>
        </li>
      </ul>
    </div>
  )
}

export default GroupCard