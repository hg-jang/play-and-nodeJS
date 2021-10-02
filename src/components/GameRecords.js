import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Button, Icon } from 'semantic-ui-react'
import { LOAD_GAMES } from '../../reducers/group'
import { fbaseFirestore } from '../fbase'
import GameRecordForm from './GameRecordForm'
import styles from '../css/group.module.css'

const GameRecords = () => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const games = useSelector((state) => state.group.currentGroup?.games)

  const [year, setYear] = useState('2021')
  const [month, setMonth] = useState('01')
  const [date, setDate] = useState('01')
  const onClickYear = (e) => {
    setYear(e.target.dataset.year)
  }
  const onClickMonth = (e) => {
    setMonth(e.target.dataset.month)
  }
  const onClickDate = (e) => {
    setDate(e.target.dataset.date)
  }

  const onClickSearch = useCallback(() => {
    const playedDate = year + month + date
    let gamesArr = []

    fbaseFirestore.collection(group).doc('group data').collection('games').where('playedDate', '==', playedDate)
    .get()
    .then((games) => {
      games.forEach((game) => {
        const gameObj = {
          winnerRatingAfter: game.data().winnerRatingAfter,
          loserRatingAfter: game.data().loserRatingAfter,
          winners: game.data().winners,
          losers: game.data().losers,
          ratingChange: game.data().ratingChange,
          playedDate: game.data().playedDate,
          writtenDate: game.data().writtenDate,
          id: game.data().id,
        }
        gamesArr = gamesArr.concat(gameObj)
      })
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      dispatch({
        type: LOAD_GAMES,
        data: gamesArr,
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }, [year, month, date])

  useEffect(() => {
    console.log(games);
  }, [games])

  return (
    <div className={styles.group_game_records}>
      <div className={styles.date_box}>
        <h1>게임 기록 찾기</h1>
        <div className="dropdown">
          <div className="dropdown__selected">
            <span className="selected">{year}</span>
            <Icon size="large" name="caret down" />
          </div>
          <ul className="dropdown__list">
            <li className="dropdown__list__item" data-year="2020" onClick={onClickYear}>2020</li>
            <li className="dropdown__list__item" data-year="2021" onClick={onClickYear}>2021</li>
            <li className="dropdown__list__item" data-year="2021" onClick={onClickYear}>2021</li>
          </ul>
        </div>
        <div className="dropdown">
          <div className="dropdown__selected">
            <span className="selected">{month}</span>
            <Icon size="large" name="caret down" />
          </div>
          <ul className="dropdown__list">
            <li className="dropdown__list__item" data-month="01" onClick={onClickMonth}>01</li>
            <li className="dropdown__list__item" data-month="02" onClick={onClickMonth}>02</li>
            <li className="dropdown__list__item" data-month="03" onClick={onClickMonth}>03</li>
            <li className="dropdown__list__item" data-month="04" onClick={onClickMonth}>04</li>
            <li className="dropdown__list__item" data-month="05" onClick={onClickMonth}>05</li>
            <li className="dropdown__list__item" data-month="06" onClick={onClickMonth}>06</li>
            <li className="dropdown__list__item" data-month="07" onClick={onClickMonth}>07</li>
            <li className="dropdown__list__item" data-month="08" onClick={onClickMonth}>08</li>
            <li className="dropdown__list__item" data-month="09" onClick={onClickMonth}>09</li>
            <li className="dropdown__list__item" data-month="10" onClick={onClickMonth}>10</li>
            <li className="dropdown__list__item" data-month="11" onClick={onClickMonth}>11</li>
            <li className="dropdown__list__item" data-month="12" onClick={onClickMonth}>12</li>
          </ul>
        </div>
        <div className="dropdown">
          <div className="dropdown__selected">
            <span className="selected">{date}</span>
            <Icon size="large" name="caret down" />
          </div>
          <ul className="dropdown__list">
            <li className="dropdown__list__item" data-date="01" onClick={onClickDate}>01</li>
            <li className="dropdown__list__item" data-date="02" onClick={onClickDate}>02</li>
            <li className="dropdown__list__item" data-date="03" onClick={onClickDate}>03</li>
            <li className="dropdown__list__item" data-date="04" onClick={onClickDate}>04</li>
            <li className="dropdown__list__item" data-date="05" onClick={onClickDate}>05</li>
            <li className="dropdown__list__item" data-date="06" onClick={onClickDate}>06</li>
            <li className="dropdown__list__item" data-date="07" onClick={onClickDate}>07</li>
            <li className="dropdown__list__item" data-date="08" onClick={onClickDate}>08</li>
            <li className="dropdown__list__item" data-date="09" onClick={onClickDate}>09</li>
            <li className="dropdown__list__item" data-date="10" onClick={onClickDate}>10</li>
            <li className="dropdown__list__item" data-date="11" onClick={onClickDate}>11</li>
            <li className="dropdown__list__item" data-date="12" onClick={onClickDate}>12</li>
            <li className="dropdown__list__item" data-date="13" onClick={onClickDate}>13</li>
            <li className="dropdown__list__item" data-date="14" onClick={onClickDate}>14</li>
            <li className="dropdown__list__item" data-date="15" onClick={onClickDate}>15</li>
            <li className="dropdown__list__item" data-date="16" onClick={onClickDate}>16</li>
            <li className="dropdown__list__item" data-date="17" onClick={onClickDate}>17</li>
            <li className="dropdown__list__item" data-date="18" onClick={onClickDate}>18</li>
            <li className="dropdown__list__item" data-date="19" onClick={onClickDate}>19</li>
            <li className="dropdown__list__item" data-date="20" onClick={onClickDate}>20</li>
            <li className="dropdown__list__item" data-date="21" onClick={onClickDate}>21</li>
            <li className="dropdown__list__item" data-date="22" onClick={onClickDate}>22</li>
            <li className="dropdown__list__item" data-date="23" onClick={onClickDate}>23</li>
            <li className="dropdown__list__item" data-date="24" onClick={onClickDate}>24</li>
            <li className="dropdown__list__item" data-date="25" onClick={onClickDate}>25</li>
            <li className="dropdown__list__item" data-date="26" onClick={onClickDate}>26</li>
            <li className="dropdown__list__item" data-date="27" onClick={onClickDate}>27</li>
            <li className="dropdown__list__item" data-date="28" onClick={onClickDate}>28</li>
            <li className="dropdown__list__item" data-date="29" onClick={onClickDate}>29</li>
            <li className="dropdown__list__item" data-date="30" onClick={onClickDate}>30</li>
            <li className="dropdown__list__item" data-date="31" onClick={onClickDate}>31</li>
          </ul>
        </div>
        <Button inverted color="grey" onClick={onClickSearch}>찾기</Button>
      </div>
      <div className={styles.records_box}>
        {games && <GameRecordForm games={games} />}
      </div>
    </div>
  )
}

export default GameRecords