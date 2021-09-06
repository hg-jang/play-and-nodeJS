import React, { useState } from 'react';
import { Icon, Input } from 'semantic-ui-react'
import styles from '../css/group.module.css'
import useInput from '../../hooks/useInput'
import RankingCard from './RankingCard';


const Ranking = () => {
  const [type, setType] = useState('전체');
  const [name, onChangeName] = useInput('')

  const onClickChangeType = (e) => {
    setType(e.target.dataset.type)
  }

  return (
    <>
      <div className={styles.ranking_filter_container}>
        <div className="dropdown">
          <div className="dropdown__selected">
            <span className="selected">{type}</span>
            <Icon size="large" name="caret down"/>
          </div>
          <ul className="dropdown__list">
            <li className="dropdown__list__item" data-type="전체" onClick={onClickChangeType}>전체</li>
          </ul>
        </div>
        <Input placeholder="text name..." value={name} onChange={onChangeName} />
      </div>
      <RankingCard name={name} type={type} />
    </>
  )
};

export default Ranking;