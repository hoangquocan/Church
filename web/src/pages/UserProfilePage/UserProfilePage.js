import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import UserProfileCell from 'src/components/User/UserProfileCell'

const UserProfilePage = ({email}) => {
  return (
    <>
     <UserProfileCell email={email}/>
    </>
  )
}

export default UserProfilePage
