import React from 'react'
import { useSelector } from 'react-redux'
import ProfileNav from '../../src/components/ProfileNav'
import styles from '../../src/css/profile.module.css'

const profile = () => {
  const { currentUser } = useSelector((state) => state.auth)


  return (
    <p> 프로파일의 인덱스 페이지</p>
  )
}

export default profile