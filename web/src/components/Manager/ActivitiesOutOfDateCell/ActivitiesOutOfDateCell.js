import ActivitiesOutOfDate from '../ActivitiesOutOfDate/ActivitiesOutOfDate'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query FindActivitiesOutOfDateQuery($time: DateTime!) {
    activitiesOutOfDate(time: $time) {
      id
      name
      date
      urlAttendance
      group {
        id
        name
        leader {
          email
          name
        }
        members {
          id
          name
          email
        }
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

export const Success = ({ activitiesOutOfDate }) => {
  return <ActivitiesOutOfDate activities={activitiesOutOfDate} />
}
