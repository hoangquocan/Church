import RecentActivity from '../RecentActivity/RecentActivity'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query RecentActivityQuery($groupId: Int) {
    recentActivity(groupId: $groupId) {
      id
      name
      date
      attendance{
        id
        member{
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
export const beforeQuery = ({ groupId }) => {
  return {variables: {groupId: groupId}}
}
export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '25%'}}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)
export const Empty = () => <div></div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ recentActivity }) => {
  return <RecentActivity activities={recentActivity} />
}
