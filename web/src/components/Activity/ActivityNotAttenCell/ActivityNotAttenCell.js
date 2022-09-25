import ActivityNotAtten from 'src/components/Attendance/ActivityNotAtten'
import { navigate, routes } from '@redwoodjs/router'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query FindActivityNotAttenQuery {
    activities: activityNotAtten {
      id
      name
      date
      group {
        id
        name
        leader {
          email
        }
      }
      groupId
      createdAt
    }
  }
`

export const Loading = () => (
  <div style={{ textAlign: 'center', marginTop: '25%' }}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)
export const Empty = () => {
  return (
    <>
      <h2
        className="text-center"
        style={{ margin: '20px auto' }}
      >
        All Activity Has Been Attendanced!
      </h2>
      <button
        className="inline-button inline-button-blue"
        style={{ margin: '0 auto', border: 'none', fontSize: '1rem' }}
        onClick={() => navigate(routes.activities())}
      >
        <ion-icon
          style={{ paddingRight: '10px', fontSize: '1.8rem' }}
          name="arrow-back-circle-outline"
        ></ion-icon>
        Go Back
      </button>
    </>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ activities }) => {
  return <ActivityNotAtten activities={activities} />
}
