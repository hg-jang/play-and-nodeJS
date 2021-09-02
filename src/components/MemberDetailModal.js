import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router'
import { fbaseFirestore } from '../fbase';
import { Button, Icon, Modal } from 'semantic-ui-react';
import styles from '../css/group.module.css'
import classNames from 'classnames';
import MemberDetailChart from './MemberDetailChart';
import MemberDetailWinningRate from './MemberDetailWinningRate';
import MemberDetailRankingRate from './MemberDetailRankingRate';
import GameRecords from './GameRecords';

const MemberDetailModal = ({ isModalOpen, setIsModalOpen, detailedMember, setDetailedMember }) => {
  const router = useRouter()
  const { group } = router.query

  const [games, setGames] = useState([])
  const [chartType, setChartType] = useState('rating')
  const [period, setPeriod] = useState(30)
  const modalRef = useRef()
  
  const onClickChangePeriod = (e) => {
    setPeriod(e.target.dataset.period)
  }

  const onClickChangeType = (e) => {
    setChartType(e.target.dataset.type)
  }

  useEffect(() => {
    console.log('detailedMembber :', detailedMember)
  })

  const info = (
    <>
      <div className={styles.detail__profile}>
      {
        detailedMember.photoURL ? 
        <img src={detailedMember.photoURL} alt="member profile" /> :
        <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="default profile img" />       
        }
      </div>
      <div>
        <span className={styles.detail__name}>{detailedMember.displayName}</span>
        <span className={styles.detail__status}>{detailedMember.status}</span>
      </div>
    </>
  )

  const periodFilter = (
    <>
      <div className={classNames({["button"]: true, [styles.button__memberDetail]: true})} onClick={onClickChangePeriod} data-period="10">10일</div>
      <div className={classNames({["button"]: true, [styles.button__memberDetail]: true})} onClick={onClickChangePeriod} data-period="30">30일</div>
      <div className={classNames({["button"]: true, [styles.button__memberDetail]: true})} onClick={onClickChangePeriod} data-period="60">60일</div>
    </>
  )

  const chartFilter = (
    <div className="dropdown dropdown__userDetail">
      <div className="dropdown__selected">
        <span className="selected">{chartType === 'rating' ? '점수' : '순위'}</span>
        <Icon fitted name="caret down" />
      </div>
      <ul className="dropdown__list">
        <li className="dropdown__list__item" onClick={onClickChangeType} data-type="rating">점수</li>
        <li className="dropdown__list__item" onClick={onClickChangeType} data-type="ranking">순위</li>
      </ul>
    </div>
  )

  const getGames = () => {
    fbaseFirestore.collection(group).doc('group data').collection('members').doc(detailedMember.uid).collection('personal records').get()
    .then((members) => {
      if(members.docs.length === 0) {
        setGames([])
      } else {
        members.forEach((member) => {
          const gameObj = {
            date: member.data().date,
            winnerRatingAfter: member.data().winnerRatingAfter,
            winners: member.data().winners,
            loserRatingAfter: member.data().loserRatingAfter,
            losers: member.data().losers,
            ratingChange: member.data().ratingChange,
          }
          setGames(games => [...games, gameObj])
        })
      }
    })
  }
  
  useEffect(() => {
    getGames()    
  }, [detailedMember])

  return (
    <Modal onClose={() => setIsModalOpen(false)} open={isModalOpen} size='large'>
      <Modal.Header>상세 정보</Modal.Header>
      <Modal.Content>
        <Modal.Description ref={modalRef}>
          <div className={styles.modal__member_detail}>
            <div className={styles.top}>
              <div className={styles.top__left}>
                {info}
              </div>
              <div className={classNames({[styles.top__circleRate]: true, [styles.winning_rate]: true})}>
                <MemberDetailWinningRate detailedMember={detailedMember} />
              </div>
              <div className={classNames({[styles.top__circleRate]: true, [styles.ranking_rate]: true})}>
                <MemberDetailRankingRate detailedMember={detailedMember} />
              </div>
            </div>
            <div className={styles.mid}>
              {periodFilter}
              {chartFilter}
            </div>
            <div className={styles.bot}>
              <div className={styles.bot__left}>
                <MemberDetailChart chartType={chartType} period={period} detailedMember={detailedMember} games={games} />
              </div>
              <div className={styles.bot__right}>
                <GameRecords games={games} />
              </div>
            </div>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="확인"
          labelPosition='right'
          icon='checkmark'
          onClick={() => {setIsModalOpen(false)}}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default MemberDetailModal