import ActivityNotAtten from 'src/components/Attendance/ActivityNotAtten'

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

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ activities }) => {
  return <ActivityNotAtten activities={activities} />
}
