import React from 'react'
import styles from '../css/group.module.css'
import Nav from "../components/Nav"

const GroupLayout = ({ children }) => {
  return (
    <div className={styles.group_container}>
      <Nav />
      { children }
    </div>
  )
}

export default GroupLayout