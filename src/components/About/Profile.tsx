import React from 'react'
import { Link } from 'react-router-dom'
import styles from './About.module.scss'
import ProfilePhoto from '../../images/profile.jpg'
export const Profile: React.FC<{}> = () => {
  const btnText: string= `Let's talk`

  return (
    <React.Fragment>
      <div className={styles.pic}>
        <img src={ProfilePhoto} alt='profile'/>
        <h4 className={styles.name}>Vitor Pires</h4>
        <span className={styles.addr}>Ilheus, Brazil</span>
        <p className={styles.role}>Web dev | game dev</p>
        <Link to='/contact'><button>{btnText}</button></Link> 
      </div>
    </React.Fragment>
  )
}
