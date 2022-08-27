import React from 'react'
import styles from './ErrorPage.module.scss'
import {Link} from 'react-router-dom'

export const  ErrorPage: React.FC<{}> = () => {
  const btnText: string = `Go back Home`

  return (
      <div className={styles.error__container}>
        <h2 className={styles.error}>404</h2>
        <h4 className={styles.message}>Page not found.</h4>
        <div>
          <Link to='/'><button>{btnText}</button></Link> 
        </div>
      </div>
    )
}
