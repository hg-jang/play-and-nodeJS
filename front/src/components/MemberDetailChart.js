import React, { useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Loader } from 'semantic-ui-react'

const MemberDetailChart = ({ chartType, period, games, detailedMember }) => {
  // userMatch에서 rating 가져오기
  const getRating = (date) => {
    const game = games.find(el => el.playedDate - date <= 0) ? games.find(el => el.playedDate - date <= 0) : detailedMember.startRating

    if(typeof game === 'number') {
      return game
    } else if(game.winners.includes(detailedMember.displayName)) {
      return game.winnerRatingAfter[game.winners.indexOf(detailedMember.displayName)]
    } else if(game.losers.includes(detailedMember.displayName)) {
      return game.loserRatingAfter[game.losers.indexOf(detailedMember.displayName)]
    }
  }

  const getDate = (date) => {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    month = month >= 10 ? month : `0${month}`
    day = day >= 10 ? day : `0${day}`

    return `${year}${month}${day}`
  }

  // 1월달에만 년도 출력하도록 변경하기
  const changeDateForm = (date) => {
    return `${date.slice(4, 6)}월 ${date.slice(6)}일`
  }
    
  const getToday = () => {
    const date = new Date()  

    return getDate(date)
  }

  const lastDays = (day) => {
    const date = new Date()
    const today = date.getDate()
    
    date.setDate(today - day)  
    
    return getDate(date)
  }

  // period에 따라 labels array 생성
  const getDataLabels = (period) => {
    let dataLabels = []  

    for(let i = 0; i < period; i++) {
        dataLabels.push(changeDateForm(lastDays(period - i)))
    }

    dataLabels.push(changeDateForm(getToday()))  

    return dataLabels
  }

  // period에 따라 datas 생성
  const getDatas = (period) => {
    let datas = []

    for(let i = 0; i < period; i ++) {
        datas.push(getRating(lastDays(period - i)))
    }
    datas.push(getRating(getToday()))

    return datas
  }

  const dataLabels = () => {
    switch(period) {
      case '10':
          return getDataLabels(period)
      case '30':
          return getDataLabels(period)
      case '60':
          return getDataLabels(period)
      default:
          break;
    }
  }

  const datas = () => {
    if(chartType === 'rating') {
      switch(period) {
        case '10':
          return getDatas(period)
        case '30':
          return getDatas(period)
        case '60':
          return getDatas(period)
        default:
          break;
      }
    } else {
      switch(period) {
        case '10':
        case '30':
        case '60':
        default:
          break;
      }
    }
  }

  return (
    <>
    {games.length === 0 && <Loader>Loading</Loader>}
    {games.length !== 0 &&
    <Line
      data={{
        labels: dataLabels(),
        datasets: [{
          label: 'Rating',
          data: datas(),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }}
      options={{ maintainAspectRatio: false }}
    />}
    </>
  )
}

export default MemberDetailChart