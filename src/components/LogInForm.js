import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_IN_REQUEST } from '../../reducers/auth'
import Router from 'next/router'
import useInput from '../../hooks/useInput'
import styles from '../css/LogInForm.module.css'

// 에러 처리 필요

const LogInForm = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, logInError } = useSelector((state) => state.auth)

  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onClickLogIn = useCallback(() => {
    console.log(email, password)
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email: email, password: password },
    })
  }, [email, password])

  useEffect(() => {
    if(isLoggedIn) {
      Router.replace('/')
    }
  }, [isLoggedIn])
  useEffect(() => {
    if(logInError) {
      alert(logInError)
    }
  }, [logInError])

  return (
    <div className={styles.logIn}>
      <h1>로그인</h1>
      <form>
        <div>
          <label htmlFor="user-email">이메일</label>
          <input className="input__underline" name="user-email" value={email} onChange={onChangeEmail} placeholder="이메일" />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <input className="input__underline" name="user-password" type="password" value={password} onChange={onChangePassword} placeholder="비밀번호" />
        </div>
        <div className="button__index" onClick={onClickLogIn}>로그인</div>
      </form>
    </div>
  )
}

export default LogInForm