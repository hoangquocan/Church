import logo from 'src/Assets/images/logo.jpg'
import './Logo.scss'
const Logo = () => {
  return (
    <div className='logo-wrapper'>
      <img src={logo} alt="VGM" />
    </div>
  )
}

export default Logo
