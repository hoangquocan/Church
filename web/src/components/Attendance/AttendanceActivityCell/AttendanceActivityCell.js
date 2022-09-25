import { Loader } from '@mantine/core'
import Attendance from 'src/components/Attendance/Attendance'
export const QUERY = gql`
  query FindActivityToAtten($id: Int!) {
    activity(id: $id) {
      id
      name
      date
      group {
        id
        name
        leader {
          email
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

export const Success = ({ activity }) => {
  return <Attendance activity={activity} />
}
