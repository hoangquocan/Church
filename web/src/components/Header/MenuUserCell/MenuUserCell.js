import { useAuth } from "@redwoodjs/auth"
import MenuUser from "../MenuUser/MenuUser"

export const QUERY = gql`
  query UserQuery($email: String!) {
    user(email: $email) {
      email
      avatar
    }
  }
`
export const beforeQuery = () => {
  const {userMetadata} = useAuth()
  const email = userMetadata.email
  // console.log(email)
  return {variables: {email}, skip: !email}
}
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ user }) => {
  return <MenuUser user={user}/>
}
