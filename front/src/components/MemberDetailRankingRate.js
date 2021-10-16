import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { degToRad, drawBase, drawGreenCircle, drawRedCircle } from './MemberDetailWinningRate'
import styles from '../css/group.module.css'

const MemberDetailRankingRate = ({ detailedMember }) => {
  const canvasRef = useRef()  
  const members = useSelector((state) => state.group.currentGroup?.members)

  // 레이팅 정렬 하기
  const sortRanking = (arr) => {
    return arr.concat().sort((a, b) => b.rating - a.rating)
  }

  // 레이팅으로 user 랭킹 상위퍼센티지 구하기
  const getRankingRate = () => {
    const sortedMembers = sortRanking(members)
    
    const member = sortedMembers.filter(el => el.displayName === detailedMember.displayName)
    const ranking = sortedMembers.indexOf(member[0]) + 1
    // 본인 순위 / 전체 인원
    return ( ranking / members.length )
  }

  // 화면 출력용 랭킹 수치 보정
  const newRankingRate = () => {
    return Math.round(getRankingRate() * 100)
  }

  useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      // 상위 퍼센티지
      drawBase(ctx, 70, 70, 20, 0, Math.PI * 2, false)
      if(getRankingRate() === 0) {
          drawGreenCircle(ctx, 70, 70, 46, degToRad(270), degToRad(-90), true)
      } else if(getRankingRate() === 1) {
          drawRedCircle(ctx, 70, 70, 46, degToRad(270), degToRad(-90), false)
      } else {
          drawGreenCircle(ctx, 70, 70, 46, degToRad(270), degToRad(270 - (360 * (1 - getRankingRate()))), true)
          drawRedCircle(ctx, 70, 70, 46, degToRad(270), degToRad(270 - (360 * (1 - getRankingRate()))), false)
      }
  }, [])

  return (
    <>
      <canvas width="140" height="140" ref={canvasRef} className="canvas"></canvas>
      <span className={styles.hover}>Hover me!</span>
      <div className={styles.game_record}>
        <span className={styles.record__left}>상위</span>
        <span className={styles.record__right}>{newRankingRate()} %</span>
      </div>
    </>
  )
}

export default React.memo(MemberDetailRankingRate)