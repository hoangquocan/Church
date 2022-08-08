import { useAuth } from '@redwoodjs/auth'
import { Link, routes, navigate } from '@redwoodjs/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import { Toaster } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'

import logo from 'src/Assets/images/Logo.png'
import './Header.scss'

const CREATE_USER = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      roles
    }
  }
`

const Header = () => {
  const [create] = useMutation(CREATE_USER)

  const { loading, isAuthenticated, logIn, logOut, currentUser, userMetadata } =
    useAuth()

    const onClick = async () => {
      if (isAuthenticated) {
        await logOut()
        navigate('/')
      } else {
        // console.log(logIn);

        await logIn()
        // await create({
        //       variables: { input: { 'email': currentUser.email, roles: 'user' } },
        //     })
      }
      // return create({
      //         variables: { input: { 'email': currentUser.email, roles: 'user' } },
      //       })
    }
    return (
      <div className="header-wrapper">
      <Toaster />
      <div className="header-logo">
        <Link to={routes.home()}>
          <img src={logo} alt="VGM" />
        </Link>
      </div>

      <div className="header-search">
        <input placeholder="Tìm Nhanh" spellCheck={false} />
        <button className="search-clear">
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <button className="search-btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      <div className="header-login">
        <button onClick={onClick}>
          {isAuthenticated ? 'Log out' : 'Log in'}
        </button>
      </div>
    </div>
  )
}

export default Header
