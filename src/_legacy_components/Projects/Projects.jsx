import React, { useEffect, useState } from 'react'
import styles from './Projects.module.scss'

export const Projects = () => {
  const [repositories, setRepositories] = useState([]) 
  
  useEffect(()=> {
    fetch('https://api.github.com/users/v1tor2003/repos')
    .then(response => response.json())
    .then(data => setRepositories(data))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ul className={styles.list}>
          {repositories.map(repository => {
            return (
              <li className={styles.element}>
                <h3 className={styles.rep__title}>{repository.name}</h3>
                <a className={styles.url} href={repository.html_url} target="_blank">url: {repository.html_url}</a>
                <h4>Last updated at: { Intl.DateTimeFormat('en-US').format(new Date(repository.updated_at))}</h4>
              </li>
            )
          })}
      </ul>
      </div>
    </div>
  )
}
