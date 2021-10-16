import React, { useEffect, useCallback } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { LOG_IN_REQUEST } from '../reducers/user'
import Router from 'next/router'

import PublicLayout from '../src/layouts/PublicLayout'
import styles from '../src/css/login.module.css'

const logIn = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, logInError } = useSelector((state) => state.user)

  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onSubmit = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    })
  }, [email, password])
  
  return (
    <PublicLayout>
      <div className={styles.logIn}>
      <h1>로그인</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label htmlFor="user-email">이메일</label>
          <input name="user-email" value={email} onChange={onChangeEmail} placeholder="이메일" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="user-password">비밀번호</label>
          <input name="user-password" type="password" value={password} onChange={onChangePassword} placeholder="비밀번호" />
        </Form.Field>
        <Button primary type="submit">로그인</Button>
      </Form>
    </div>
    </PublicLayout>
  )
}

export default logIn