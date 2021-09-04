import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { SIGN_UP_REQUEST } from '../reducers/auth'
import styles from '../src/css/signUp.module.css'


// 회원가입 이후의 라우터 처리 필요
// 에러 처리 필요

const signUp = () => {
  const dispatch = useDispatch()
  const { signUpError } = useSelector((state) => state.auth)

  const [email, onChangeEmail] = useInput('')
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

  const onClickSignUp = useCallback(() => {
    if(password !== passwordCheck) {
      return setPasswordError(true)
    }
    if(!term) {
      return setTermError(true)
    }
    console.log(email, password)
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email: email, password: password },
    })
  }, [email, password, passwordCheck, term])

  useEffect(() => {
    if(signUpError) {
      alert(signUpError)
    }
  }, [signUpError])

  return (
    <div className={styles.signUp}>
      <h1>회원가입</h1>
      <form>
        <div>
          <label htmlFor="user-email">이메일</label>
          <input className="input__underline" name="user-email" value={email} onChange={onChangeEmail} placeholder="이메일" />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <input type="password" className="input__underline" name="user-password" value={password} onChange={onChangePassword} placeholder="비밀번호" required />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <input className="input__underline" type="password" name="user-password-check" value={passwordCheck} onChange={onChangePasswordCheck} placeholder="비밀번호 확인" required />
        </div>
        {passwordError && <span>비밀번호가 일치하지 않습니다.</span>}
        <div className={styles.term}>
          <div>
            <input type="checkbox" onClick={onClickCheckbox} />
            <label>주인님의 말에 복종할것은 맹세합니다.</label>
          </div>
          {termError && <span>복종 서약에 동의하십시오.</span>}
        </div>
        <div className="button__normal" onClick={onClickSignUp}>회원가입</div>
      </form>

    </div>
  )
}

export default signUp