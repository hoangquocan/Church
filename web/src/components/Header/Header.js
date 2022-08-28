import { useAuth } from '@redwoodjs/auth'
import { Link, routes, navigate } from '@redwoodjs/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import { getAuth } from "firebase/auth";
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
  // const [create] = useMutation(CREATE_USER)

  const { loading, isAuthenticated, logIn, logOut, currentUser, userMetadata,getCurrentUser } =
    useAuth()
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
    }
  const onClick = async () => {
    if (isAuthenticated) {
      await logOut()
      navigate('/')
    } else {
      await logIn()
    }
      // await create({
      //       variables: { input: { 'email': currentUser.email, roles: 'user' } },
      //     })
    // return create({
    //         variables: { input: { 'email': currentUser.email, roles: 'user' } },
    //       })
  }
  // console.log(displayName)
  // console.log(currentUser.uid)
  // console.log(getCurrentUser)
  // console.log(userMetadata)
  return (
    <header className="header-wrapper">
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
       <div className="search-btn">
          <button >
          <ion-icon name="search-outline"></ion-icon>
          </button>
       </div>
      </div>

      <div className="header-login">
        <button onClick={onClick}>
          {isAuthenticated ? 'Out' : 'Log in'}
        </button>
      </div>
    </header>
  )
}

export default Header
