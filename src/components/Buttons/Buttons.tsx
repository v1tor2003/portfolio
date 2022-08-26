import React from 'react'
import styles from './Buttons.module.scss'
import cvFile from '../../images/ResumeEN.png'
import {AiFillGithub} from 'react-icons/ai'

export const Buttons: React.FC <{}> = () => {
  const gitUrl: string = 'https://github.com/v1tor2003'
  
  return (
    <React.Fragment >
      <div className={styles.container}>
        <div>
          <a href={cvFile} download={`Vitor's CV`}><button className={styles.btn}>Download CV</button></a>
        </div>
        <div>
          <a target='_blank' href={gitUrl}><button className={styles.btn}>See More <AiFillGithub /></button></a>
        </div>
      </div>      
    </React.Fragment>
  )
}
