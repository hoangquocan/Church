import ActivityNotAtten from 'src/components/Attendance/ActivityNotAtten'
import { navigate, routes, back } from '@redwoodjs/router'
export const QUERY = gql`
  query FindActivityNotAttenQuery {
    activities: activityNotAtten {
      id
      name
      date
      group {
        id
        name
      }
      groupId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () =>  {
  return (
    <>
      <h3 className="text-center" style={{margin: "1rem"}}>All Activity Has Been Attendanced!</h3>
      <button className="inline-button inline-button-blue" style={{margin: "0 auto"}} onClick={() => navigate(routes.activities())}><ion-icon style={{padding: '5px', fontSize: '2rem'}} name="arrow-back-circle-outline"></ion-icon>Go Back</button>
    </>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ activities }) => {
  return <ActivityNotAtten activities={activities} />
}
