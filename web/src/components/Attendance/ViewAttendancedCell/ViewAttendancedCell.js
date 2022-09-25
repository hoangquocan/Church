import ViewAttendanced from '../ViewAttendanced'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query ViewAttendancedQuery($groupId: Int, $fromDate: DateTime, $toDate: DateTime) {
   viewAttendanced(groupId: $groupId, fromDate: $fromDate, toDate: $toDate) {
      id
      date
      name
      attendance{
        id
        member {
          name
          email
          urlAvatar
          phoneNumber
        }
        present
      }
    }
  }
`
export const beforeQuery = ({groupId, fromDate, toDate})=> {
  return {variables: {groupId: groupId,fromDate, toDate}}
}
export const Loading = () => (
  <div style={{ textAlign: 'center', marginTop: '10%' }}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)

export const Empty = () => (
  <h2 className="text-center">
    No Record Yet
  </h2>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ viewAttendanced }) => {
  return <ViewAttendanced attendanced={viewAttendanced} />
}
