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
    <Skeleton height={26} mt={16} width="300px" radius="xl" />
    <Skeleton height={26} mt={16} width="350px" radius="xl" />
    <Skeleton height={26} mt={16} width="260px" radius="xl" />
    <Skeleton height={26} mt={16} width="320px" radius="xl" />
  </>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ group }) => {
  return <Group group={group} />
}
