import Link from 'next/link'
import classNames from 'classnames'
import MyTeam from '../src/public/component/PublicMyTeam'
import styles from '../src/css/myGroups.module.css'

const myGroups = () => {

  return (
    <>
      {/* <MyTeam /> */}
      <div className={styles.newTeam}>
        <div className={classNames({["container"]: true, [styles.container__public_newTeam]: true})}>
          <div className="button__index"><Link href="/public/public_createGroup"><a>그룹 생성하기</a></Link></div>
          <div className="button__index"><Link href="/public/public_joinGroup"><a>그룹 가입하기</a></Link></div>
        </div>
      </div>
    </>
  )
}

export default myGroups