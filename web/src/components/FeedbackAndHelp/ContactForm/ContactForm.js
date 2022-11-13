import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import { showNotification } from '@mantine/notifications'

import './ContactForm.scss'

const ContactForm = () => {
  const form = useRef()
  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'gmail',
        'template_churchsystem',
        form.current,
        '-Gkcrpvvp4rYgjRpU'
      )
      .then(
        (result) => {
          showNotification({
            title: 'Thank you! Your feedback has been received.',
            autoClose: 3000,
            radius: 'md',
            styles: (theme) => ({
              root: {
                borderColor: theme.colors.gray[8],
                backgroundColor: theme.colors.gray[7],
                '&::before': { backgroundColor: theme.white },
              },
              title: {
                color: theme.white,
              },
              icon: {
                backgroundColor: theme.white,
                color: theme.white,
              },
              closeButton: {
                color: theme.colors.white,
                '&:hover': {
                  color: theme.white,
                  backgroundColor: theme.colors.gray[6],
                },
              },
            }),
          })
          form.current.reset()
        },
        (error) => {
          console.log(error.text)
        }
      )
  }
  return (
    <div className="contactform-wrapper">
      <form ref={form} className="contactform-inner" onSubmit={sendEmail}>
        <div className="contactform-inner__info">
          <div>
            <h2>Contact Info</h2>
            <ul className="info">
              <li>
                <ion-icon name="location-outline"></ion-icon>
                <p>
                  109 Phan Đăng Lưu, <br />
                  P.7, Quận Phú Nhuận <br />
                  TP. Hồ Chí Minh
                </p>
              </li>
              <li>
                <ion-icon name="mail-outline"></ion-icon>
                <p>hoangquocan91@gmail.com</p>
              </li>
              <li>
                <ion-icon name="call-sharp"></ion-icon>
                <p>+84 938 949 377</p>
              </li>
            </ul>
          </div>
          <ul className="logo">
            <li>
              <a>
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a>
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li>
              <a>
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </li>
            <li>
              <a>
                <ion-icon name="logo-whatsapp"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
        <div className="contactform-inner__form">
          <h2>Send Feedback</h2>
          <div className="formBox">
            <div className="inputBox w50">
              <input type="text" name="first_name" required />
              <p>First Name</p>
            </div>
            <div className="inputBox w50">
              <input type="text" name="last_name" required />
              <p>Last Name</p>
            </div>
            <div className="inputBox w50">
              <input type="email" name="email" required />
              <p>Email Address </p>
            </div>
            <div className="inputBox w50">
              <input type="text" name="phone" required />
              <p>Phone Number</p>
            </div>
            <div className="inputBox w100">
              <textarea required name="message"></textarea>
              <p>Please write your feedback here...</p>
            </div>
            <div className="inputBox w100">
              <input type="submit" value="Send" />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
