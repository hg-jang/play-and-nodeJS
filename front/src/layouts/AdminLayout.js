import React from 'react'
import Admin_Nav from "../components/Admin_Nav"
import styles from '../css/admin_group.module.css'

const AdminLayout = ({ children }) => {

  return (
    <div className={styles.admin_group_grid}>
      <Admin_Nav />
      { children }
    </div>
  )
}

export default AdminLayout
