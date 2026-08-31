import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import styles from './Contact.module.scss'
import { FiInstagram } from 'react-icons/fi'
import { AiFillLinkedin, AiFillGithub, AiFillFacebook } from 'react-icons/ai'

export const Contact = () => {
  const myIG = 'https://www.instagram.com/vitor.pr_/'
  const myLinked = 'https://www.linkedin.com/in/pires-vitor/'
  const myGit = 'https://github.com/v1tor2003'
  const myFace = 'https://www.facebook.com/vitor.piresrocha/'
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_7bp9ym6', 'template_veehoga', form.current, 'qCg8iiGkLDhc0JaIr')
      .then((result) => {
          alert('Email successfully sent!')
          window.location.reload(false)
      }, (error) => {
          alert('Failed to send the email, please try again')
      });
  };

  return (
      <div className={styles.text__zone}>
          <div className={styles.contact__form}>
            <h2>Send me a email:</h2><br/>
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className={styles.half}>
                  <input type="text" name="name" placeholder="Full Name" required/>
                </li>
                <li className={styles.half}>
                  <input type="email" name="email" placeholder="Email" required/>
                </li>
                <li>
                  <input type="text" name="subject" placeholder="Subject" required/>
                </li>
                <li>
                  <textarea name="message" placeholder="Message" required />
                </li>
                <li>
                  <button type="submit" className={styles.flat__button}>Send</button>
                </li>
              </ul>
            </form><br/>
            <h2>Or find me at:</h2><br/>
            <div className={styles.network}>
              <div>
                <a href={myIG} target='_blank'><FiInstagram/></a>
              </div>
              <div>
                <a href={myLinked} target='_blank'><AiFillLinkedin/></a>
              </div>
              <div>
                <a href={myGit} target='_blank'><AiFillGithub/></a>
              </div>
              <div>
                <a href={myFace} target='_blank'><AiFillFacebook/></a>
              </div>
            </div>
          </div>
      </div>
    );
}
