import Activity from '../Activity/Activity'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query FindActivityQuery($id: Int!) {
    activity(id: $id) {
      id
      name
      date
      urlAttendance
      group {
        id
        name
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
    <Loader variant="oval" size="md" color="dark" />
  </div>
)
export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ activity}) => {
  return <Activity activity={activity} />
}
