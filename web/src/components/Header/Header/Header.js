import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'
import { Button, Divider, Modal, useMantineTheme } from '@mantine/core'
import { useToggle } from '@mantine/hooks'

import SearchBar from '../SearchBar/SearchBar'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import MenuUser from '../MenuUser'
import logo from 'src/Assets/images/Logo.png'
import './Header.scss'

const Header = () => {
  const [opened, setOpened] = useState(false)
  const [type, toggleType] = useToggle(['login', 'signup'])
  // const handleSearch = () => {
  //   const x = document.getElementById('search-bar')
  //   const y = document.getElementById('header-logo')
  //   if (x.style.display === 'none') {
  //     x.style.display = 'block'
  //     y.style.display = 'none'
  //   } else {
  //     x.style.display = 'none'
  //     y.style.display = 'block'
  //   }
  // }
  const { isAuthenticated, currentUser, userMetadata } = useAuth()
  const theme = useMantineTheme()
  const handleLogin = () => {
    setOpened(false)
  }
  return (
    <header className="header-wrapper">
      <div id="header-logo">
        <Link to={routes.home()}>
          <img src={logo} alt="VGM" />
          <span style={{ fontFamily: 'Lobster Two' }}>
            ChurchSystem<span>v0.0.1</span>
          </span>
        </Link>
      </div>
      <div id="search-bar">
        <SearchBar />
      </div>
      {/* <div className='search'>
        <input type="search"/>
        <button className="search-btn" onClick={handleSearch}>
        <ion-icon name="search-outline"></ion-icon>
      </button>
      </div> */}
      <Modal
        title={
          type == 'login'
            ? 'Log in to ChurchSystem'
            : 'Sign up for ChurchSystem'
        }
        opened={opened}
        onClose={() => setOpened(false)}
        overlayColor={theme.colors.gray[4]}
        overlayOpacity={0.55}
        overlayBlur={3}
        // overflow="inside"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        closeButtonLabel="Close authentication modal"
        styles={(theme) => ({
          title: {
            fontSize: '1.4rem',
            margin: '0 auto',
            fontWeight: 500,
          },
          header: {
            fontSize: '1.4rem',
            marginBottom: '6px',
            marginTop: '-6px',
          },
        })}
      >
        <Divider size="sm" mb="16px" ml="-22px" mr="-22px" />
        {type === 'login' && <Login handleLogin={handleLogin} />}
        {type === 'signup' && <SignUp handleLogin={handleLogin} />}
        <Divider size="sm" mt={20} ml="-22px" mr="-22px" />
        {type === 'login' ? (
          <div className="login-signup">
            <p>Don't have an account? </p>{' '}
            <button onClick={() => toggleType()}>Sign up</button>
          </div>
        ) : (
          <div className="login-signup">
            <p>Already have an account? </p>{' '}
            <button onClick={() => toggleType()}>Log in</button>
          </div>
        )}
      </Modal>
      <div className="header-login">
        {isAuthenticated ? (
          <MenuUser />
        ) : (
          <Button
            onClick={() => setOpened(true)}
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
          >
            Log In
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header
