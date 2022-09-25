import ManagerUsers from '../ManagerUsers/ManagerUsers'

export const QUERY = gql`
  query UsersHasRoleQuery {
    usersHasRole {
      id
      name
      email
      avatar
      userRoles {
        id
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ usersHasRole }) => {
  return <ManagerUsers users={usersHasRole} />
}
