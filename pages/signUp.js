import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { SIGN_UP_REQUEST } from '../reducers/auth'
import Router from 'next/router'

const signUp = () => {
  const dispatch = useDispatch()
  const { isSignedUp, signUpError } = useSelector((state) => state.auth)

  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onClick = useCallback(() => {
    console.log(email, password)
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email: email, password: password },
    })
  }, [email, password])

  useEffect(() => {
    if(isSignedUp) {
      Router.replace('/')
    }
  }, [isSignedUp])
  useEffect(() => {
    if(signUpError) {
      alert(signUpError)
    }
  }, [signUpError])

  return (
    <>
      <h1>회원가입 페이지</h1>
      <input name="user-email" value={email} onChange={onChangeEmail} />
      <input name="user-password" value={password} onChange={onChangePassword} />
      <button onClick={onClick}>회원가입</button>

    </>
  )
}

export default signUp