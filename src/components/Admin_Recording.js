import React from 'react'
import Admin_RecordForm from './Admin_RecordForm'
import styles from '../css/admin_group.module.css'

const AdminRecording = () => {
  return (
    <div className={styles.admin_recording}>
      <div className={styles.record_form}>
          <Admin_RecordForm />
      </div>
    </div>
  )
}

export default AdminRecording