import React from 'react'
import { NavBar } from '../NavBar/NavBar'
import styles from './SharedLayout.module.scss'
import { Outlet } from 'react-router-dom'

export const SharedLayout: React.FC <{}> = () => {
  const topTag: string = `printf("`
  const bottomTag: string = `");`
  return (
    <React.Fragment>
        <NavBar/>
        <div className={styles.page}>
          <Outlet/>
        </div>
    </React.Fragment>
  )
}
