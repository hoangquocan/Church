import { useAuth } from '@redwoodjs/auth'
import { useState, useContext, useRef } from 'react'
import { Divider, Modal, useMantineTheme } from '@mantine/core'
import { useToggle } from '@mantine/hooks'

import { RefContext } from 'src/components/Context/Context/Context'
import SearchBar from '../SearchBar/SearchBar'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import MenuUser from '../MenuUser'
import './Header.scss'
import Logo from 'src/components/Logo/Logo'

const Header = () => {
  const [opened, setOpened] = useState(false)
  const [openedSearch, setOpenedSearch] = useState(false)
  const [type, toggleType] = useToggle(['login', 'signup'])
  const { isAuthenticated } = useAuth()
  const theme = useMantineTheme()

  const context = useContext(RefContext)
  const toggleRef = useRef()
  const headerRef = useRef()
  const searchRef = useRef()

  const onToggleClick = () => {
    context.sidebarRef.current.classList.toggle('active')
    context.containerRef.current.classList.toggle('active')
    headerRef.current.classList.toggle('active')
  }

  const handleLogin = () => {
    setOpened(false)
  }
  const handleIconSearch = () => {
    setOpenedSearch(true)
    searchRef.current.classList.toggle('active')
  }
  const handleCloseSearch = () => {
    setOpenedSearch(false)
    searchRef.current.classList.toggle('active')
  }
  return (
    <div className="header-wrapper" ref={headerRef}>
      <div className="sidebar-toggle" ref={toggleRef} onClick={onToggleClick}>
        <ion-icon name="menu-outline"></ion-icon>
      </div>

      <div className="search-bar">
        <SearchBar />
      </div>
      <Modal
        opened={openedSearch}
        onClose={() => handleCloseSearch()}
        withCloseButton={false}
        overlayOpacity={0}
        overlayBlur={0}
        transition="fade"
        transitionDuration={500}
        transitionTimingFunction="ease"
        padding={0}
        styles={() => ({
          root: {
            background: '#021027',
          },
          modal: {
            backgroundColor: 'transparent',
            marginBottom: '50px',
            minHeight: '800px',
          },
          inner: {
            padding: '40px 4px',
          },
          body: {
            display: 'flex',
            alignItems: 'center',
          },
        })}
      >
        <ion-icon
          style={{
            color: 'var(--color-primary)',
            fontSize: '26px',
            marginRight: '8px',
          }}
          onClick={() => handleCloseSearch()}
          name="arrow-undo-outline"
        ></ion-icon>
        <SearchBar handleCloseSearch={handleCloseSearch} />
      </Modal>
      <Modal
        title={
          type == 'login' ? (
            <>
              <ion-icon
                style={{ position: 'absolute', left: '12px' }}
                onClick={() => setOpened(false)}
                name="arrow-undo-outline"
              ></ion-icon>{' '}
              Welcome to BTN Gia Định
            </>
          ) : (
            <>
              <ion-icon
                style={{ position: 'absolute', left: '12px' }}
                onClick={() => setOpened(false)}
                name="arrow-undo-outline"
              ></ion-icon>
              Sign up for System
            </>
          )
        }
        opened={opened}
        onClose={() => setOpened(false)}
        overlayColor="transparent"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        withCloseButton={false}
        fullScreen
        styles={() => ({
          root: {
            background: '#101113',
            '@media(min-width: 480px)': {
              background: '#5C5F66',
            },
          },
          modal: {
            backgroundColor: 'rgba(0, 0, 0, .7)',
          },
          inner: {
            '@media(min-width: 480px)': {
              width: '450px',
              margin: '0 auto',
            },
          },
          title: {
            fontSize: '1.4rem',
            margin: '0 auto',
            fontWeight: 500,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
          },
          header: {
            marginBottom: '6px',
            marginTop: '50px',
          },
        })}
      >
        <Divider size="sm" mb="20px" ml="-19px" mr="-19px" color="#dd5e89" />
        <Logo />
        {type === 'login' && <Login handleLogin={handleLogin} />}
        {type === 'signup' && <SignUp handleLogin={handleLogin} />}
        <Divider size="sm" mt={30} ml="-19px" mr="-19px" color="#dd5e89" />
        {type === 'login' ? (
          <div className="login-signup">
            <p>Don't have an account? </p>{' '}
            <button onClick={() => toggleType()}>Sign up</button>
          </div>
        ) : (
          <div className="login-signup">
            <p>Already have an account? </p>{' '}
            <button onClick={() => toggleType()}>Sign in</button>
          </div>
        )}
      </Modal>
      <div className="header-login">
        {isAuthenticated ? (
          <>
            <div className="search-toggle" ref={searchRef}>
              <ion-icon
                name="search-outline"
                onClick={() => handleIconSearch()}
              ></ion-icon>
            </div>
            <MenuUser />
          </>
        ) : (
          <button className="btn-cyan" onClick={() => setOpened(true)}>
            <ion-icon name="log-in-outline"></ion-icon>Log In
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
