import ManagerUsers from '../ManagerUsers/ManagerUsers'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query UsersHasRoleQuery {
    usersHasRole {
      id
      name
      email
      avatar
      group {
        name
        id
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

export const Empty = () => <h2 className='text-center'>No Leader or Manager To View</h2>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ usersHasRole }) => {
  return <ManagerUsers users={usersHasRole} />
}
