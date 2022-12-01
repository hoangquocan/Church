import UserProfileCell from 'src/components/User/UserProfileCell'
import { MetaTags } from '@redwoodjs/web'

const UserProfilePage = ({ email }) => {
  return (
    <>
      <MetaTags title="Profile  " />
      <UserProfileCell email={email} />
    </>
  )
}

export default UserProfilePage
