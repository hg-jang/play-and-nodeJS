import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { SIGN_UP_REQUEST } from '../reducers/user'
import { Button, Form } from 'semantic-ui-react'
import Router from 'next/router'

import styles from '../src/css/signUp.module.css'
import PublicLayout from '../src/layouts/PublicLayout'

const signUp = () => {
  const dispatch = useDispatch()
  const { signUpError, isSignedUp } = useSelector((state) => state.user)

  useEffect(() => {
    if(isSignedUp) {
      Router.push('/')
    }
  }, [isSignedUp])
  useEffect(() => {
    if(signUpError) {
      alert('회원가입 오류 :', signUpError)
    }
  }, [signUpError])

  const [email, onChangeEmail] = useInput('')
  const [nickname, onChangeNickname] = useInput('')
  const [password, onChangePassword] = useInput('')
  
  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value)
    setPasswordError(e.target.value !== password)
  }, [password])

  const [term, setTerm] = useState(false)
  const [termError, setTermError] = useState(false)
  const onClickCheckbox = useCallback((e) => {
    setTerm(e.target.checked)
    if(e.target.checked) {
      setTermError(false)
    }
  }, [])

  const onSubmit = useCallback(() => {
    if(password !== passwordCheck) {
      return setPasswordError(true)
    }
    if(!term) {
      return setTermError(true)
    }
    console.log(email, nickname, password)
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, nickname, password },
    })
  }, [email, nickname, password, passwordCheck, term])

  return (
    <PublicLayout>
      <div className={styles.signUp}>
        <h1>회원가입</h1>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label htmlFor="user-email">이메일</label>
            <input name="user-email" value={email} onChange={onChangeEmail} placeholder="이메일" />
          </Form.Field>
          <Form.Field>
            <label htmlFor="user-nickname">이름</label>
            <input required name="user-nickname" value={nickname} onChange={onChangeNickname} placeholder="이름" />
          </Form.Field>
          <Form.Field>
            <label htmlFor="user-password">비밀번호</label>
            <input type="password" name="user-password" value={password} onChange={onChangePassword} placeholder="비밀번호" required />
          </Form.Field>
          <Form.Field>
            <label htmlFor="user-password-check">비밀번호 확인</label>
            <input className="input__underline" type="password" name="user-password-check" value={passwordCheck} onChange={onChangePasswordCheck} placeholder="비밀번호 확인" required />
          </Form.Field>
          {passwordError && <span>비밀번호가 일치하지 않습니다.</span>}
          <div className={styles.term}>
            <div>
              <input type="checkbox" onClick={onClickCheckbox} />
              <label>주인님의 말에 복종할것은 맹세합니다.</label>
            </div>
            {termError && <span>복종 서약에 동의하십시오.</span>}
          </div>
          <Button primary type="submit">회원가입</Button>
        </Form>
      </div>
    </PublicLayout>
  )
}

export default signUp