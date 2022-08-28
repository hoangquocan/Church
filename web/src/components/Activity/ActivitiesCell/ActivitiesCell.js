import { Link, routes } from '@redwoodjs/router'
import Activities from '../Activities/Activities'

export const QUERY = gql`
  query ActivitiesQuery {
    activities {
      id
      name
      date
      group {
        name
      }
      groupId
      urlAttendance
      createdAt
      attendance {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="text-center">
      <h3>No Activity Yet</h3>
      <Link to={routes.newActivity()} style={{ color: 'var(--color-link)' }}>
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ activities }) => {
  return <Activities activities={activities} />
}
