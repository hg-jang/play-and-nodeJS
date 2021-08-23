import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useInput from '../hooks/useInput'
import { SIGN_UP_REQUEST } from '../reducers/auth'

const signUp = () => {
  const dispatch = useDispatch()
  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onClick = useCallback(() => {
    console.log(email, password)
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email: email, password: password },
    })
  }, [email, password])

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