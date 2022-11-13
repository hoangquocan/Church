import Activity from '../Activity/Activity'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query FindActivityQuery($id: Int!) {
    activity(id: $id) {
      id
      name
      date
      urlAttendance
      attendance {
        id
        present
        member{
          name
        }
      }
      group {
        id
        name
      }
    }
  }
`

export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '25%'}}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)
export const Empty = () => <h3 className='text-center'>Your group has not yet initiated an activity</h3>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ activity}) => {
  return <Activity activity={activity} />
}
