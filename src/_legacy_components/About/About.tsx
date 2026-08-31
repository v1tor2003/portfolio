import React from 'react'
import styles from './About.module.scss'
import {Profile} from './Profile'
import { TextField } from './TextField'

export const About: React.FC<{}> = () => {

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Profile />
        <TextField/>     
      </div>
    </React.Fragment>
  )
}
