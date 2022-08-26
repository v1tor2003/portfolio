import React from 'react'
import styles from './About.module.scss'

export const TextField: React.FC <{}> = () => {
  return (
    <React.Fragment> 
      <div className={styles.text}> 
        <h2>About me</h2>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;I am a computer science student at Santa Cruz State University,<br/> 
          the course started in 2021 and is currently in progress.<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;After a long time learning how to code with C and C++ 
          I have got into the web development, 
          especially using JavaScript (using TS), Ruby on Rails and React.<br/><br/>

          &nbsp;&nbsp;&nbsp;&nbsp;Currently I am looking for a first job oportunity 
          to improve my skills and learn new technologies. 
        </p>
      </div>
    </React.Fragment>
  )
}
