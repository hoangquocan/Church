import { Link, routes } from '@redwoodjs/router'
import { Loader } from '@mantine/core'
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

export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '25%'}}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)
export const Empty = () => {
  return (
    <div className="text-center">
      <h2>No Activity Yet</h2>
      <Link to={routes.newActivity()} style={{ color: 'var(--color-link)', fontSize: '1.2rem', fontFamily: 'Dancing Script, cursive' }}>
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
