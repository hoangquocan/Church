import UserProfile from "../UserProfile"
import { Loader } from "@mantine/core"

export const QUERY = gql`
  query UserQuery($email: String!) {
    user(email: $email) {
      id
      name
      email
      avatar
      bio
      group{
        id
        name
      }
      userRoles {
        id
        name
      }
    }
  }
`

export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '25%'}}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ user }) => {
  return <UserProfile user={user} />
}
