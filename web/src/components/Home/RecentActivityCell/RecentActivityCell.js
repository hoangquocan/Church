import RecentActivity from '../RecentActivity/RecentActivity'
import { Loader, Skeleton } from '@mantine/core'

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
  <div style={{ textAlign:'center', marginTop: '5%'}}>
    <Skeleton height={60} mt={16} width="50%" radius="md" />
    <Skeleton height={50} mt={20} radius="sm" />
    <Skeleton height={50} mt={20} radius="sm" />
    <Skeleton height={50} mt={20} radius="sm" />
    <Skeleton height={50} mt={20} radius="sm" />
    <Skeleton height={50} mt={20} radius="sm" />
    <Skeleton height={50} mt={20} radius="sm" />
    <Skeleton height={50} mt={20} radius="sm" />
  </div>
)
export const Empty = () => <div></div>

export const Failure = ({ error }) => (
  <div>Not assign one group yet</div>
)

export const Success = ({ recentActivity }) => {
  return <RecentActivity activities={recentActivity} />
}
