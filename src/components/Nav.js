import React, { useCallback } from 'react'
import { CHANGE_CONTENT } from '../../reducers/group';
import Link from 'next/link';
import styles from '../css/group.module.css'
import { useDispatch } from 'react-redux';

const Nav = () => {
  const dispatch = useDispatch()

  const onClickList = useCallback((e) => {
    const content = e.target.dataset.content

    dispatch({
      type: CHANGE_CONTENT,
      data: content,
    })
  }, [])

  return (
    <div className={styles.nav}>
      <ul>
        <li data-content="community" onClick={onClickList}>커뮤니티</li>
        <li data-content="ranking" onClick={onClickList}>멤버 랭킹</li>
        <li data-content="member list" onClick={onClickList}>멤버 리스트</li>
      </ul>
      <span className={styles.back}><Link href="/myGroups"><a>선택 화면으로</a></Link></span>
      <footer>
          <p className="footer--top">&copy; 2021, Built by</p>
          <p className="footer--bot">gilmujjang & Hyeon-Gwang</p>
      </footer>
    </div>
  )
}

export default Nav