import { Link, routes } from '@redwoodjs/router'
import { Loader } from '@mantine/core'
import Activities from '../Activities/Activities'

export const QUERY = gql`
  query ActivitiesQuery ($page: Int!) {
    activitiesPage (page: $page) {
      activities {
        id
        name
        date
        group {
          name
        }
        urlAttendance
        createdAt
        attendance {
          id
          present
          member{
            id
            name
          }
        }
      }
      count
    }
  }
`

export const Loading = () => (
  <div style={{ textAlign: 'center', marginTop: '10%', marginBottom: '10%' }}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)
export const Empty = () => {
  return (
    <div className="text-center">
      <h2>No Activity Yet</h2>
      <Link
        to={routes.newActivity()}
        style={{
          color: 'var(--color-link)',
          fontSize: '1.2rem',
          fontFamily: 'Dancing Script, cursive',
        }}
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ activitiesPage, page }) => {
  return <Activities activities={activitiesPage.activities} page={page}/>
}
