import { Link, routes } from '@redwoodjs/router'
import Members from '../Members/Members'

export const QUERY = gql`
  query MembersQuery {
    members {
      id
      name
      birthDate
      address
      phoneNumber
      email
      urlAvatar
      group {
        name
      }
      createdAt
    }
  }
`

export const Loading = () => {
  return <h3 className="text-center">Loading...</h3>
}

export const Empty = () => {
  return (
    <div className="text-center">
      <h3>No members yet.</h3>
      <Link to={routes.newMember()} style={{ color: 'var(--color-link)' }}>
        {'Create one?'}
      </Link>
    </div>
  )
}
export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ members }) => {
  return <Members members={members} />
}
