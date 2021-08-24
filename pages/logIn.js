import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { LOG_IN_REQUEST } from '../reducers/auth'
import Router from 'next/router'

const logIn = () => {
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
    <>
      <h1>로그인 페이지</h1>
      <input name="user-email" value={email} onChange={onChangeEmail} />
      <input name="user-password" value={password} onChange={onChangePassword} />
      <button onClick={onClickLogIn}>로그인</button>
    </>
  )
}

export default logIn