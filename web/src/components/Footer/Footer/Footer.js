import { Text } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Footer.scss'
import {
  faYoutube,
  faTwitter,
  faInstagram,
  faWhatsapp,
  faTiktok,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-info">
        <p>© 2022 Ban Thanh Niên Gia Định. Website is under construction.</p>
      </div>
      <ul className="footer-logos">
        <a style={{ '--color': '#4267B2' }} target="_blank" href="https://www.facebook.com/btn.giadinh/?ref=page_internal">
          {/* <li  className="footer-logos__logo"> */}
            <i className="fa fa-facebook" aria-hidden="true"></i>
          {/* </li> */}
        </a>
        <a style={{ '--color': '#1da1f2' }} target="_blank" href="https://twitter.com/">
          {/* <li className="footer-logos__logo"> */}
            <i className="fa fa-twitter" aria-hidden="true"></i>
          {/* </li> */}
        </a>
        <a style={{ '--color': '#ff0000' }} target="_blank" href="https://www.youtube.com/">
          {/* <li  className="footer-logos__logo"> */}
            <i className="fa fa-youtube-play" aria-hidden="true"></i>
          {/* </li> */}
        </a>
        <a style={{ '--color': '#dd2a7b' }} target="_blank" href='https://www.instagram.com/'>
        {/* <li  className="footer-logos__logo"> */}
          <i className="fa fa-instagram" aria-hidden="true"></i>
        {/* </li> */}
        </a>
      </ul>
    </div>
  )
}

export default Footer
