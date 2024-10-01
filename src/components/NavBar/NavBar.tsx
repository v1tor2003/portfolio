import React, { useEffect, useState } from 'react'
import styles from './NavBar.module.scss'
import { FiAlignJustify } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import * as data from './links.json'
import { Link } from 'react-router-dom'

const linksData: string = JSON.stringify(data)
const links = JSON.parse(linksData).links

type LinkModel = {
  label: string
  href: string 
}

interface screenDetails{
  width: number
  height: number
}

export const NavBar: React.FC<{}> = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [screenSize, setScreenSize] = useState<screenDetails>({
    width: window.innerWidth,
    height: window.innerHeight

  })
  
  useEffect(() => {
    const handleResize = () =>{
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect (() => {
    if(window.innerWidth > 768 && menuOpen)
      setMenuOpen(false)
  }, [window.innerWidth, menuOpen])
  
  const handleToggle = () => {
    setMenuOpen((prevState) => !prevState)
  }
  
  return (
    <header className={styles.navbar}>  
      <div className={styles.navbar__message}>Outdated version. Major update is comming soon...</div>
      <div className={styles.navbar__container}>
        <h2 className={styles.navbar__container__logo}>Personal Portfolio</h2>
        <nav className={`${styles.navbar__container__elements} ${menuOpen && window.innerWidth < 768? styles.isMenu : ""}`}>
          <ul>
            {links.map ((link: LinkModel) => {
              return (
                <li key={link.href}>
                  <Link onClick={handleToggle} to={link.href}>{ link.label }</Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className={styles.navbar__container__toggle}>
          { menuOpen ?
            (<AiOutlineClose onClick={handleToggle}/>)
            :
            (<FiAlignJustify onClick={handleToggle}/>)
          }
        </div>
      </div>
    </header>  
  )
}
