import Group from 'src/components/Group/Group'
import { Skeleton } from '@mantine/core'

export const QUERY = gql`
  query FindGroupById($id: Int!) {
    group: group(id: $id) {
      id
      name
      userId
      leader{
        id
        name
        email
        avatar
      }
      members {
        id
      }
    }
  }
`
export const Loading = () => (
  <>
    <Skeleton height={22} mt={16} radius="xl" />
    <Skeleton height={22} mt={16} radius="xl" />
    <Skeleton height={22} mt={16} width="70%" radius="xl" />
  </>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ group }) => {
  return <Group group={group} />
}
