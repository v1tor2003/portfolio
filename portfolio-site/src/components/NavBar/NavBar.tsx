import React from 'react'
import styles from './NavBar.module.scss'
import * as data from './links.json'
import { Link } from 'react-router-dom'

const linksData = JSON.stringify(data)
const links = JSON.parse(linksData).links

type LinkModel = {
  label: string
  href: string 
}

export const NavBar: React.FC<{}> = () => {
  return (
    <nav className={styles['nav-bar']}>  
      <div className={styles['logo-container']}>
        <span>Logo</span>
      </div>
      <div className={styles['links-container']}>
        {links.map ((link: LinkModel) => {
          return (
            <div key={link.href} className={styles['link']}>
              <Link to={link.href} style={{textDecoration: "none", color: "white"}}>{link.label}</Link>
            </div>
          )
        })}
      </div>
    </nav>  
  )
}
