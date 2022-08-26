import React from 'react'
import Typewriter from 'typewriter-effect'
import { Buttons } from '../Buttons/Buttons'
import styles from './Hero.module.scss'
import Video from '../../videos/bgvideo.mp4'

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <video src={Video} autoPlay loop muted/>
      <div className={styles.content}>
        <h2 className={styles.hi}>Hi, my name is</h2>
        <h1 className={styles.myname}>Vitor</h1>
        <h3 className={styles.desc}>I am </h3>
        <span className={styles.animation}>
            <Typewriter 
              options={{
                autoStart: true,
                strings: ['a fullstack dev', 'a C enjoyer', 'a Rails lover', 'a React adventurous', 'a CSS hater', 'a JAVA beginner'],
                loop: true,
                cursor: "_",
                delay: 150,
              }}
            />
          </span>
        <br/>
        <div className={styles.hero__content__btns}>
          <Buttons />
        </div>
      </div>
    </div>
  )
}
